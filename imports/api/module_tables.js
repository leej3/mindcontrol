import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Subjects = new Mongo.Collection('subjects');

import "./table_utils.js"
import "./publications.js"
import "./methods.js"

TabularTables = {}



TabularTables.brainmask =  new Tabular.Table({
name:"brainmask",
    autoWidth: false,
    collection: Subjects,
    columns:[
    
      
        get_filter_field("brainmask", "subject_id", "Exam ID"),
      
    
      
        get_qc_viewer("brainmask", "name", "Freesurfer ID"),
      
    
      
        get_qc_filter_field("brainmask", "quality_check.QC", "QC"),
      
    
      
        get_filter_field("brainmask", "checkedBy", "checked by"),
      
    
      
        get_filter_field("brainmask", "quality_check.user_assign", "Assigned To"),
      
    
      
        {data: "quality_check.notes_QC", title: "Notes" }
      
    
    ]
    })


TabularTables.wm =  new Tabular.Table({
name:"wm",
    autoWidth: false,
    collection: Subjects,
    columns:[
    
      
        get_filter_field("wm", "subject_id", "Exam ID"),
      
    
      
        get_qc_viewer("wm", "name", "Freesurfer ID"),
      
    
      
        get_qc_filter_field("wm", "quality_check.QC", "QC"),
      
    
      
        get_filter_field("wm", "checkedBy", "checked by"),
      
    
      
        get_filter_field("wm", "quality_check.user_assign", "Assigned To"),
      
    
      
        {data: "quality_check.notes_QC", title: "Notes" }
      
    
    ]
    })


TabularTables.aparcaseg =  new Tabular.Table({
name:"aparcaseg",
    autoWidth: false,
    collection: Subjects,
    columns:[
    
      
        get_filter_field("aparcaseg", "subject_id", "Exam ID"),
      
    
      
        get_qc_viewer("aparcaseg", "name", "Freesurfer ID"),
      
    
      
        get_qc_filter_field("aparcaseg", "quality_check.QC", "QC"),
      
    
      
        get_filter_field("aparcaseg", "checkedBy", "checked by"),
      
    
      
        get_filter_field("aparcaseg", "quality_check.user_assign", "Assigned To"),
      
    
      
        {data: "quality_check.notes_QC", title: "Notes" }
      
    
    ]
    })


TabularTables.mriqc_entry =  new Tabular.Table({
name:"mriqc_entry",
    autoWidth: false,
    collection: Subjects,
    columns:[
    
      
        get_filter_field("mriqc_entry", "subject_id", "Exam ID"),
      
    
      
        get_qc_viewer("mriqc_entry", "name", "Freesurfer ID"),
      
    
      
        get_qc_filter_field("mriqc_entry", "quality_check.QC", "QC"),
      
    
      
        get_filter_field("mriqc_entry", "checkedBy", "checked by"),
      
    
      
        get_filter_field("mriqc_entry", "quality_check.user_assign", "Assigned To"),
      
    
      
        {data: "quality_check.notes_QC", title: "Notes" }
      
    
    ]
    })


TabularTables.manual_meta =  new Tabular.Table({
name:"manual_meta",
    autoWidth: false,
    collection: Subjects,
    columns:[
    
      
        get_filter_field("manual_meta", "subject_id", "Exam ID"),
      
    
      
        get_qc_viewer("manual_meta", "name", "Freesurfer ID"),
      
    
      
        get_qc_filter_field("manual_meta", "quality_check.QC", "QC"),
      
    
      
        get_filter_field("manual_meta", "checkedBy", "checked by"),
      
    
      
        get_filter_field("manual_meta", "quality_check.user_assign", "Assigned To"),
      
    
      
        {data: "quality_check.notes_QC", title: "Notes" }
      
    
    ]
    })

