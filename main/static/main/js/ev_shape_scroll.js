// console.log("Starting scoll lib")
anim_start_screen_p=90/100
anim_stop_screen_p=40/100

dict_anim_p={
    ".section-container":[90/100,50/100]
}

start_props={
    ".scroll-highlighter":
    {
        ".circ-bigger .scrolling-bg":
        {
            "transform":
            {
                "translateX": [0,"%"],
                "translateZ":[0,""]
            }
        },
        ".scroll-anim":
        {
            "opacity":
            {
                "": [1,""],
            }
        },
        ".scroll-text-container .scrolling-bg":
        {
            "transform":
            {
                "translateX": [0,"%"],
                "translateZ":[0,""]
            }
        },
    },
    ".section-container":
    {
        ".title-text":
        {
            "transform":
            {
                "rotateX":[-20,"deg",],
                "rotateY":[-20,"deg",],
            }
        },
        
    },
    // ".wrapper-2":
    // {
    //     ".circ-inner-hider":
    //     {
    //         "transform":
    //         {
    //             "scale":[0,""],
    //         },
    //     },
    //     ".circ-bigger":
    //     {
    //         "transform":
    //         {
    //             "scale": [0.5,""],
    //         },
    //     },
    // },
}

end_props={
    ".scroll-highlighter":
    {
        ".circ-bigger .scrolling-bg":
        {
            "transform":
            {
                "translateX": [-100,"%"],
                "translateZ":[0,""]
            }
        },
        ".scroll-anim":
        {
            "opacity":
            {
                "": [0,""],
            }
        },
        ".scroll-text-container .scrolling-bg":
        {
            "transform":
            {
                "translateX": [-101,"%"],
                "translateZ":[0,""]
            }
        },
    },
    ".section-container":
    {
        ".title-text":
        {
            "transform":
            {
                "rotateX":[0,"deg",],
                "rotateY":[0,"deg",],
            }
        },
        
    },
    

}

window.addEventListener("load", function() {
        // console.log("Adding listener")
        // window.addEventListener("resize", recalc_anim)
        // window.addEventListener("scroll", recalc_anim)
        window.onresize = recalc_anim
        window.onscroll = recalc_anim
    })

function get_screen_y_p (ele,pos) {
    pos = pos || "middle"
    c_rect=ele.getBoundingClientRect()
    if (pos=="top")
    {
        ele.neg_offset = c_rect.height
    }
    else if (pos=="middle")
    {
        ele.neg_offset = c_rect.height/2
    }
    else if (pos=="bottom")
    {
        ele.neg_offset = 0
    }
    
    ele_screen_y=c_rect.bottom - ele.neg_offset
    ele_screen_y_p= ele_screen_y/window.innerHeight
    return (ele_screen_y_p)
}


function do_trf (ele_wrapper, sub_ele, cur_start_props,cur_end_props, cur_start_screen_p,cur_stop_screen_p) {
        var cur_props={}
        // console.log(cur_start_screen_p,cur_stop_screen_p)
        var y_p = ((get_screen_y_p(ele_wrapper,"top")) - cur_start_screen_p)/(cur_stop_screen_p - cur_start_screen_p)
        // console.log(get_screen_y_p(ele_wrapper),cur_start_screen_p,cur_stop_screen_p,y_p)
        if (y_p<=0)
        {
            cur_props = cur_start_props
        }
        else if (y_p>=1)
        {
            cur_props = cur_end_props
        }
        else
        {
            // i.e. if (y_p>0 && y_p<1)
            for (var prop_name in cur_start_props)
            {
                cur_props[prop_name] = {}
                var cur_sub_props= cur_props[prop_name]

                var cur_start_sub_props=cur_start_props[prop_name]
                var cur_end_sub_props=cur_end_props[prop_name]

                for (var sub_prop_name in cur_start_sub_props)
                {
                    cur_sub_props[sub_prop_name] =[]
                    var cur_arr = cur_sub_props[sub_prop_name]

                    var sub_prop_start_arr= cur_start_sub_props[sub_prop_name]
                    var sub_prop_end_arr= cur_end_sub_props[sub_prop_name]

                    var start_prop_val = sub_prop_start_arr[0]
                    var start_prop_unit = sub_prop_start_arr[1]
                    var end_prop_val = sub_prop_end_arr[0]
                    var end_prop_unit = sub_prop_end_arr[1]
                
                    // console.assert(start_prop_unit==end_prop_unit)

                    var cur_prop_val = start_prop_val+(end_prop_val - start_prop_val)*y_p
                    var cur_prop_unit = start_prop_unit
                    
                    cur_arr[0] = cur_prop_val
                    cur_arr[1] = cur_prop_unit
                }
            }

        }

        // set css
        for (var prop_name in cur_props)
        {
            var cur_sub_props=cur_props[prop_name]
            var css_str=get_css_str(cur_sub_props)
            // console.log(prop_name+":"+css_str)
            sub_ele.style[prop_name]=css_str
        }
    // }


}

function recalc_anim (ev) {
    // console.time("recalc time")
    // console.log("Recalcing scroll style")

    for (var ele_wrapper_selector in start_props)
    {
        var list_ele_wrapper=document.querySelectorAll(ele_wrapper_selector)
        for (var i = 0; i < list_ele_wrapper.length; i++)
        {
            var ele_wrapper=list_ele_wrapper[i]
            ele_wrapper.changed=true
        };
    }
    requestAnimationFrame(
        function(){
            // console.time("animframe time")
            for (var ele_wrapper_selector in start_props)
            {
                if (dict_anim_p[ele_wrapper_selector])
                {
                    var cur_start_screen_p= dict_anim_p[ele_wrapper_selector][0]
                    var cur_stop_screen_p= dict_anim_p[ele_wrapper_selector][1]
                }
                else
                {
                    var cur_start_screen_p=anim_start_screen_p
                    var cur_stop_screen_p=anim_stop_screen_p
                }
                var list_ele_wrapper=document.querySelectorAll(ele_wrapper_selector)
                // console.log("list_ele_wrapper".list_ele_wrapper)
                for (var i = 0; i < list_ele_wrapper.length; i++)
                {
                    var ele_wrapper=list_ele_wrapper[i]
                    if (ele_wrapper)
                    {
                        var ele_start_props= start_props[ele_wrapper_selector]
                        var ele_end_props= end_props[ele_wrapper_selector]
                        if (ele_wrapper.changed)
                        {
                            ele_wrapper.changed=false
                            for (var sub_ele_selector in ele_start_props)
                            {
                                if (sub_ele_selector=="")
                                {
                                    var list_sub_ele=[ele_wrapper]
                                }
                                else
                                {
                                    var list_sub_ele=ele_wrapper.querySelectorAll(sub_ele_selector)
                                }
                                // console.log("list_sub_ele",list_sub_ele)
                                for (var j = 0; j < list_sub_ele.length; j++)
                                {
                                    var sub_ele=list_sub_ele[j]
                                    // console.log(sub_ele)
                                    // var sub_ele=ele_wrapper.querySelector(sub_ele_selector)
                                    
                                    var sub_ele_start_props= ele_start_props[sub_ele_selector]
                                    var sub_ele_end_props= ele_end_props[sub_ele_selector]
                                    do_trf(ele_wrapper, sub_ele,sub_ele_start_props,sub_ele_end_props,cur_start_screen_p,cur_stop_screen_p)
                                }
                            }
                        }
                    }
                }
            }
            // console.timeEnd("animframe time")
        }, 16)
    // console.timeEnd("recalc time")

}

function get_css_str (props) {
    var css_str=""
    for (prop_name in props)
    {
        var cur_prop=props[prop_name]
        var cur_prop_val = cur_prop[0]
        var cur_prop_unit = cur_prop[1]
        if (prop_name=="")
        {
            var bracket=["",""]
        }
        else
        {
            var bracket=["(",") "]
        }
        css_str+=(prop_name+bracket[0]+String(cur_prop_val)+cur_prop_unit+bracket[1])
    }
    return(css_str)
}

// todo negate ff autoscroll