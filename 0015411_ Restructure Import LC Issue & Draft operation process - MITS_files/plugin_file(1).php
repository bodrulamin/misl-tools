/**
 * Created by REZA on 4/7/2016.
 */


/**
 * Create the resource link to load the jQuery library.
 */

function check() {
    var dropdown = document.getElementById("plugin_timecard_spent");
    var current_value = dropdown.options[dropdown.selectedIndex].value;

    if (current_value == "3") {
        document.getElementById("plugin_timecard_severity").style.display = "block";
        document.getElementById("plugin_timecard_priority").style.display = "block";
        document.getElementById("plugin_timecard_resolution").style.display = "block";
        document.getElementById("plugin_timecard_severity_label").style.display = "block";
        document.getElementById("plugin_timecard_priority_label").style.display = "block";
        document.getElementById("plugin_timecard_resolution_label").style.display = "block";

    }
    else {
        document.getElementById("plugin_timecard_severity").style.display = "none";
        document.getElementById("plugin_timecard_priority").style.display = "none";
        document.getElementById("plugin_timecard_resolution").style.display = "none";
        document.getElementById("plugin_timecard_severity_label").style.display = "none";
        document.getElementById("plugin_timecard_priority_label").style.display = "none";
        document.getElementById("plugin_timecard_resolution_label").style.display = "none";
    }
}

