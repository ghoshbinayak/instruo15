str_event_preview_on="event-preview-on"
str_event_preview_off="event-preview-off"
str_preview_on="preview-on"
str_preview_off="preview-off"

// str_event_preview_on_started="event-preview-on_started"
// str_event_preview_off_started="event-preview-off_started"
// str_preview_on_started="preview-on_started"
// str_preview_off_started="preview-off_started"

// str_event_preview_on_ended="event-preview-on_ended"
// str_event_preview_off_ended="event-preview-off_ended"
// str_preview_on_ended="preview-on_ended"
// str_preview_off_ended="preview-off_ended"
    
function rand_range (low,high) {
    return Math.random()*(high-low)+low
}

list_col=["#540045","#C60052","#FF714B","#EAFF87","#ACFFE9"]

window.onload =function () {
    // console.log("asd")
    nunjucks.configure("./");
    data={}
    data.events=[
                    {
                        "tag_text_short":"",
                        "tag_text_full":"Contacts",
                        "dict_date_text":{3:true,4:true,5:true},
                        "name_text":"Game on",
                        "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        "prize_money":"$$",
                        "poster": '/static/main/img/event1.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        "tag_text_short":"",
                        "tag_text_full":"Contacts",
                        "dict_date_text":{15:true,16:false,17:true},
                        "name_text":"Robotics",
                        "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        "prize_money":"$$",
                        "poster": '/static/main/img/event2.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        "tag_text_short":"",
                        "tag_text_full":"Contacts",
                        "dict_date_text":{3:true,4:true,5:true},
                        "name_text":"Coding",
                        "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        "prize_money":"$$",
                        "poster": '/static/main/img/event3.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        "tag_text_short":"",
                        "tag_text_full":"Contacts",
                        "dict_date_text":{3:true,4:true,5:true},
                        "name_text":"On Stage",
                        "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        "prize_money":"$$",
                        "poster": '/static/main/img/event4.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        "tag_text_short":"",
                        "tag_text_full":"Contacts",
                        "dict_date_text":{3:true,4:true,5:true},
                        "name_text":"Electronikaz",
                        "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        "prize_money":"$$",
                        "poster": '/static/main/img/event5.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        "tag_text_short":"",
                        "tag_text_full":"Contacts",
                        "dict_date_text":{3:true,4:true,5:true},
                        "name_text":"Hammer It",
                        "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        "prize_money":"$$",
                        "poster": '/static/main/img/event6.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        // "tag_text_short":"Gen. Quiz",
                        // "tag_text_full":"ContactsGeneral Quiz",
                        // "dict_date_text":{3:true,4:true,5:true},
                        // "name_text":"Gru-botics Mega",
                        // "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        // "prize_money":"$$",
                        // "poster": '/static/main/img/event1.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        // "tag_text_short":"Gen. Quiz",
                        // "tag_text_full":"ContactsGeneral Quiz",
                        // "dict_date_text":{3:true,4:true,5:true},
                        // "name_text":"Gru-botics Mega",
                        // "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        // "prize_money":"$$",
                        // "poster": '/static/main/img/event1.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    },
                    {
                        // "tag_text_short":"Gen. Quiz",
                        // "tag_text_full":"ContactsGeneral Quiz",
                        // "dict_date_text":{3:true,4:true,5:true},
                        // "name_text":"Gru-botics Mega",
                        // "preview_details_text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rem alias, nostrum consequatur repellendus delectus eius, voluptatem dolor commodi ipsam mollitia dolore. Optio perspiciatis nesciunt culpa omnis quos, recusandae odio. Debitis sequi error, minima laboriosam eveniet id consequuntur veniam, dolores voluptatum corporis repudiandae quae explicabo officia, nam! Tempore, vero, totam.",
                        // "prize_money":"$$",
                        // "poster": '/static/main/img/event1.png',
                        
                        "shape_before_trf_x":rand_range(-35, 35),
                        "shape_before_trf_y":rand_range(-35, 35),
                        "shape_before_rot":rand_range(-80, 80),

                        "shape_after_trf_x":rand_range(-35, 35),
                        "shape_after_trf_y":rand_range(-35, 35),
                        "shape_after_rot":rand_range(-80, 80),

                        "col_r":Math.round(rand_range(100, 250)),
                        "col_g":Math.round(rand_range(100, 250)),
                        "col_b":Math.round(rand_range(100, 250)),

                        // "both_tri":Math.round(rand_range(0, 1)),
                        // "col_hex": list_col[Math.floor(rand_range(0, list_col.length))]

                    }
                ]
    data.ev_order=[1,6,2,7,3,8,4,9,5]
    // data.ev_order=[1,7,4,5,8,2,6,3,9]
    
    // var req_all_ev_html = new XMLHttpRequest();
    var ele_tmpl_all_event= document.querySelector(".tmpl_all_event")
    // req_all_ev_html.open("GET", ele_tmpl_all_event.src,true)
    // req_all_ev_html.onload=function () {
        var html_rendered = nunjucks.renderString(ele_tmpl_all_event.innerHTML, data);
        var ele_events = document.querySelector(".events");
        ele_events.innerHTML = html_rendered;

        arr_ele_events=document.querySelectorAll(".event")
        last_zoomed= undefined

        for (var ele_index = 0; ele_index < arr_ele_events.length; ele_index++) 
        {
            (function () {
                var cur_ele = arr_ele_events[ele_index]

                cur_ele.preview_button=cur_ele.querySelector(".event-preview-button")
                var events_ele=document.querySelector(".events")
                if (cur_ele.preview_button)
                {

                    cur_ele.preview_button.onclick = function (ev)
                    {
                        if (last_zoomed && last_zoomed!==cur_ele)
                        {
                            var list_c=last_zoomed.classList
                            if (list_c.contains(str_event_preview_on))
                            {
                                list_c.remove(str_event_preview_on)

                            }
                            if (list_c.contains(str_event_preview_off))
                            {
                                list_c.remove(str_event_preview_off)

                            }
                        }

                        last_zoomed = cur_ele
                        var list_c=cur_ele.classList
                        if (list_c.contains(str_event_preview_on))
                        {
                            list_c.remove(str_event_preview_on)
                            list_c.add(str_event_preview_off)

                        }
                        else
                        {
                            if (list_c.contains(str_event_preview_off))
                            {
                                list_c.remove(str_event_preview_off)
                            }
                                list_c.add(str_event_preview_on)
                                
                        } 

                        if (events_ele.classList.contains(str_preview_on))
                        {
                            events_ele.classList.remove(str_preview_on)
                            events_ele.classList.add(str_preview_off)   
                        }
                        else
                        {
                            if (events_ele.classList.contains(str_preview_off))
                            {
                                events_ele.classList.remove(str_preview_off)
                            }
                            events_ele.classList.add(str_preview_on)
                        }
                        // todo - pass ele name
                        // request_details(cur_ele)
                    }
                }
            })();
        };
    // }
    // req_all_ev_html.send()

    // var req_ev_shape_css = new XMLHttpRequest();
    var ele_tmpl_shape_css= document.querySelector(".tmpl_shape_css")
    // req_ev_shape_css.open("GET", ele_tmpl_shape_css.src,true)
    // req_ev_shape_css.onload=function () {
        var css_rendered = nunjucks.renderString(ele_tmpl_shape_css.innerHTML, data);
        var ele_inj_css=document.querySelector(".ev_injected_css")
        ele_inj_css.innerHTML=css_rendered
    // }
    // req_ev_shape_css.send()

}

function request_details (parent_ele) {
    // todo - get ele name
    if (!parent_ele.querySelector(".ext-wrapper"))
    {
        window.setTimeout(
            function()
            {

                // var req_single_ev_html = new XMLHttpRequest();
                var ele_tmpl_single_event= document.querySelector(".tmpl_single_event")
                // req_single_ev_html.open("GET", ele_tmpl_single_event.src,true)
                // req_single_ev_html.onload=function () {
                    var html_rendered = nunjucks.renderString(ele_tmpl_single_event.innerHTML, data);
            
                    var ext_wrapper=document.createElement("div")
                    ext_wrapper.classList.add("ext-wrapper")
                    ext_wrapper.innerHTML= html_rendered
                    parent_ele.querySelector(".event-full-page").appendChild(ext_wrapper)
                // }
                // req_single_ev_html.send()

            }, 2000)
    }
}