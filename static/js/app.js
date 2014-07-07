var SD = function() { 

  // data for diagram
  this.data = [
    {
      "name": "Germany", 
      "values": {
        "2012": 81800000,
        "2050": 71500000        
      }
    },
    {
      "name": "France",  
      "values": {
        "2012": 63600000,
        "2050": 72400000        
      }
    },
    {
      "name": "Italy",
      "values": {
        "2012": 60900000,
        "2050": 63600000        
      }
    },
    {
      "name": "Spain",
      "values": {
        "2012": 46200000,
        "2050": 47900000   
      }
    }
  ];
  this.keys = ['2012', '2050'];
  this.colors = ['#1D71B8', '#F39200'];  
  
  this.chartCreationDone = false;
  
  this.init();  
  
};

SD.prototype = {

  init: function() {
 
    $.each(this.data, function(i, val) {
      $('#step1').find('table').append('<tr><td>' + val.name + '</td><td>' + val.values['2012'] + '</td><td>' + val.values['2050'] + '</td></tr>');
    });
  
    // event handler
    $(document).hammer();
    $(document).on('tap', '#createDiagram', $.proxy(this.createDiagram,this));
      
  },
  
  /***************************************
  * Helpers 
  ***************************************/
  
  objectLength: function(obj) {
    var len = 0;
    for (var o in obj) {
        len++;
    }
    return len;
  },
  
  maxValue: function(obj) {
    var max = 0;
    $.each(obj, function(i, v) {
      $.each(v.values, function(j, val) {
        if (val > max) max = val;  
      });  
    });
    return max;
  },
  
  longestString: function(obj) {
    var max = 0;
    $.each(obj, function(i, v) {
      var w = $.fn.textWidth(v.name, '12px Arial');
      if (w > max) {
        max = w;
      } 
    });
    return max;
  },

  /***************************************
  * Events
  ***************************************/
  
  createDiagram: function() {
  
    if (!this.chartCreationDone) {

      var self = this;
      var data = this.data;
      
      // register custom namespaces for D3
      d3.ns.prefix.ex = 'http://example.com/';
      
      var width = 420,
          barHeight = 20;
  
      var x = d3.scale.linear()
              .range([0, width])
              .domain([0, this.maxValue(data)]);            
              
      var longestString = this.longestString(data);
  
      // create chart            
      var chart = d3.select('#chart')
                  .append('svg:svg')
                  .attr('width', width + longestString + 10)
                  .attr('version', '1.1')
                  .attr('xmlns', 'http://www.w3.org/2000/svg');
         
      // add custom namespace with jQuery      
      // workaround, because of D3 bug: https://github.com/mbostock/d3/issues/1935               
      $('svg').attr('xmlns:ex', 'http://example.com/');
    
      chart.attr('height', barHeight * this.objectLength(data) * self.keys.length);
    
      var bar = chart.selectAll('g')
          .data(data)
          .enter().append('g')
          .attr('about', function(d) { return 'http://dbpedia.org/resource/' + d.name })
          .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight * self.keys.length + ')'; });
          
      bar.append('text')
         .attr('x', longestString)
         .attr('y', ((barHeight * self.keys.length) / 2))
         .attr('dy', '.35em')
         .attr('width', longestString + 10)
         .attr('class', 'name')
         .text(function(d) { return d.name; });    
    
      for (i = 0; i < this.keys.length; i++) {
        var barGroup = bar.append('g').
            attr('rel', 'ex:hasPopulation');    
            
        barGroup.append('rect')
           .attr('width', function(d) { return x(d.values[self.keys[i]]); })
           .attr('height', function() { return (i == self.keys.length - 1) ? barHeight - 1 : barHeight })
           .attr('transform', function(d) { return 'translate(' + (longestString + 10) + ',' + i * barHeight + ')'; })
           .style('fill', function() { return self.colors[i] });        
            
        barGroup.append('text')
           .attr('x', function(d) { return x(d.values[self.keys[i]]) - 5; })
           .attr('y', function() { return (barHeight * i) + (barHeight / 2) })
           .attr('dy', '.35em')
           .attr('class', 'value')        
           .attr('property', 'ex:population')
           .attr('datatype', 'xsd:int')
           .text(function(d) { return d.values[self.keys[i]]; });
           
        barGroup.append('text')
           .attr('x', longestString + 15)
           .attr('y', function() { return (barHeight * i) + (barHeight / 2) })
           .attr('dy', '.35em')
           .attr('class', 'year')
           .attr('property', 'ex:year')         
           .attr('datatype', 'xsd:int')         
           .text(function(d) { return self.keys[i]; });         
           
      }
      
      $('#chart').show();
      this.chartCreationDone = true;
    
    }
        
  }
  
};

$(function() {
  var sd = new SD();
});