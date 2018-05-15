import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './module_templates.html';
import "./d3_plots.js"


get_filter = function(entry_type){

 var globalSelector = Session.get("globalSelector")
    var myselect = {}
    myselect["entry_type"] = entry_type

    if (globalSelector){
        globalKeys = Object.keys(globalSelector)
        //console.log("global keys are", globalKeys, globalKeys.indexOf(entry_type))
        if (globalKeys.indexOf(entry_type) >= 0){
            var localKeys = Object.keys(globalSelector[entry_type])
            //console.log("local keys are", localKeys)
            for (i=0;i<localKeys.length;i++){
                myselect[localKeys[i]] = globalSelector[entry_type][localKeys[i]]
            }//end for
        };//end if

        //console.log("selector for", entry_type, "is", myselect)

        // In this part, if another filter has filtered subjects, then filter on the rest
        var subselect = Session.get("subjectSelector")

        if (subselect["subject_id"]["$in"].length){
            myselect["subject_id"] = subselect["subject_id"]
        }
        //console.log("myselect is", myselect)
        return myselect
    }


}

get_metrics = function(entry_type){
    Meteor.call("get_metric_names", entry_type, function(error, result){
            Session.set(entry_type+"_metrics", result)
        })
        return Session.get(entry_type+"_metrics")
}

render_histogram = function(entry_type){
                var metric = Session.get("current_"+entry_type)//"Amygdala"
                if (metric == null){
                    var all_metrics = Session.get(entry_type+"_metrics")

                    if (all_metrics != null){
                        Session.set("current_"+entry_type, all_metrics[0])
                    }

                }

                if (metric != null){
                    var filter = get_filter(entry_type)
                    //console.log("filter is", filter)
                    Meteor.call("getHistogramData", entry_type, metric, 20, filter, function(error, result){
                    //console.log("result is", result)
                    var data = result["histogram"]
                    var minval = result["minval"]
                    var maxval = result["maxval"]
                    if (data.length){
                        do_d3_histogram(data, minval, maxval, metric, "#d3vis_"+entry_type, entry_type)
                    }
                    else{
                        console.log("attempt to clear histogram here")
                    }


                    });
                }
}



Template.brainmask.rendered = function() {

      if (!this.rendered){
        this.rendered = true
         }


    

       this.autorun(function() {
                render_histogram("brainmask")

       }); //end autorun

     

  }





Template.wm.rendered = function() {

      if (!this.rendered){
        this.rendered = true
         }


    

       this.autorun(function() {
                render_histogram("wm")

       }); //end autorun

     

  }





Template.aparcaseg.rendered = function() {

      if (!this.rendered){
        this.rendered = true
         }


    

       this.autorun(function() {
                render_histogram("aparcaseg")

       }); //end autorun

     

  }





Template.mriqc_entry.rendered = function() {

      if (!this.rendered){
        this.rendered = true
         }


    

       this.autorun(function() {
                render_histogram("mriqc_entry")

       }); //end autorun

     

  }





Template.manual_meta.rendered = function() {

      if (!this.rendered){
        this.rendered = true
         }


    

       this.autorun(function() {
                render_histogram("manual_meta")

       }); //end autorun

     

  }







Template.brainmask.helpers({

selector: function(){return get_filter("brainmask")},



metric: function(){
        return get_metrics("brainmask")
    },
currentMetric: function(){
        return Session.get("current_brainmask")
    }



})



Template.wm.helpers({

selector: function(){return get_filter("wm")},



metric: function(){
        return get_metrics("wm")
    },
currentMetric: function(){
        return Session.get("current_wm")
    }



})



Template.aparcaseg.helpers({

selector: function(){return get_filter("aparcaseg")},



metric: function(){
        return get_metrics("aparcaseg")
    },
currentMetric: function(){
        return Session.get("current_aparcaseg")
    }



})



Template.mriqc_entry.helpers({

selector: function(){return get_filter("mriqc_entry")},



metric: function(){
        return get_metrics("mriqc_entry")
    },
currentMetric: function(){
        return Session.get("current_mriqc_entry")
    }



})



Template.manual_meta.helpers({

selector: function(){return get_filter("manual_meta")},



metric: function(){
        return get_metrics("manual_meta")
    },
currentMetric: function(){
        return Session.get("current_manual_meta")
    }



})




  
   Template.brainmask.events({
    "change #metric-select-brainmask": function(event, template){
        var metric = $(event.currentTarget).val()
        console.log("metric: ", metric)
        Session.set("current_brainmask", metric)
    }
   })
  

  
   Template.wm.events({
    "change #metric-select-wm": function(event, template){
        var metric = $(event.currentTarget).val()
        console.log("metric: ", metric)
        Session.set("current_wm", metric)
    }
   })
  

  
   Template.aparcaseg.events({
    "change #metric-select-aparcaseg": function(event, template){
        var metric = $(event.currentTarget).val()
        console.log("metric: ", metric)
        Session.set("current_aparcaseg", metric)
    }
   })
  

  
   Template.mriqc_entry.events({
    "change #metric-select-mriqc_entry": function(event, template){
        var metric = $(event.currentTarget).val()
        console.log("metric: ", metric)
        Session.set("current_mriqc_entry", metric)
    }
   })
  

  
   Template.manual_meta.events({
    "change #metric-select-manual_meta": function(event, template){
        var metric = $(event.currentTarget).val()
        console.log("metric: ", metric)
        Session.set("current_manual_meta", metric)
    }
   })
  
