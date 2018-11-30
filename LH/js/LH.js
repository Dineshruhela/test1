
LH = {
    target:null,
    normalFont : "https://localhost/LH/fonts/Avenir_LT_55_Roman.ttf",
    BoldFont : "https://localhost/LH/fonts/Avenir_LT_95_Black.ttf",
    mediumFont : "https://localhost/LH/fonts/Avenir_LT_65_Medium.ttf",
    heavyFont : "https://localhost/LH/fonts/Avenir_LT_85_heavy.ttf",
    fonts : [],
    sloganFonts : [],
    monoFonts : [],
    svgWidth : 192,
    svgHeight : 336,
    dimension : [{ width: 336, height: 192 }, { width: 192, height: 336 }],
    
    svgSafeArea : 30,
    allData : [],
    frontJsonData:{},
    constantVars : {
        
        targets: { 2: 'logo', 7: 'logo', 8: 'logo', 9: 'slogan', 10: 'slogan', 3: 'background', 12: 'background', 13: 'logoColor', 14: 'sloganColor', 15: 'symbolColor', 16: 'containerColor' },
        colors: { 'bgColor': '#000000', 'bgColorFamily': '', 'mainTextColor': '#ffffff', 'mainTextFamily': '', 'sloganTextColor': '#ffffff', 'sloganTextFamily': '', 'iconColor': '#ffffff', 'iconFamily': '', 'frameColor': '#ffffff', 'frameFamily': '', 'iconFrameColor': '#ffffff', 'iconFrameFamily': '' },
        SVGWIDTH: this.svgWidth,
        SVGHEIGHT: this.svgHeight,
        VIEWBOXWIDTH: 640,
        VIEWBOXHEIGHT: 480,
        CONTAINERWIDTH: parseInt(this.SVGWIDTH / 0.7),
        CONTAINERHEIGHT: parseInt(this.SVGHEIGHT / 0.7),
        MINX: (this.SVGWIDTH - this.CONTAINERWIDTH) / 2,
        MINY: (this.SVGHEIGHT - this.CONTAINERHEIGHT) / 2,
        MAXX: ((this.SVGWIDTH - this.CONTAINERWIDTH) / 2) + this.CONTAINERWIDTH,
        MAXY: ((this.SVGHEIGHT - this.CONTAINERHEIGHT) / 2) + this.CONTAINERHEIGHT,
        FRAMERATIO: 210,
        SPACING: { 'logoLetterSpacing': 1, 'sloganLetterSpacing': 0, 'logoSizeSlider': 100, 'iconVsTextSlider': 0, 'iconDistanceSlider': 50, 'frameSizeSlider': 50, 'sloganTextSize': 24, 'logoTextSlider': 72, 'textSloganDistSlider': 40, 'iconFrameSizeSlider': 50 }
    },
    LHjson : localStorage.getItem("LHjson") ? JSON.parse(localStorage.getItem("LHjson")) : {},
    init : function(logo_id){
        
        LH.allData=[];
        return new Promise((r,j)=>{
            $('.cardsection').remove();
            $('body').append('<section class="cardsection"><div class="blockCard" id="LHSVG"></div><div class="blockCard" id="LHSVG_BG"></div></section>');
            $.ajax({
                url: "https://localhost/designhill/logoMakerAjax.php",
                type: "POST",
                crossDomain: true,
                dataType: "json",
                data : {action:'get_logo_svg',logo_id:logo_id},
                success: function (response) {
                    
                    LH.frontJsonData = $.parseJSON(response.logo_json);
                    console.log("%c Got all data from response", 'color: #22aaff;font-weight: bold;');               
                    $.ajax({
                        url: "https://localhost/designhill/dh_ajax.php",
                        // url: "https://localhost/LH/data/back-data.json",
                        type: "POST",
                        data: { action: 'letterhead_ajax', action_type: 'get_templates' },
                        success: function (response) {
                            console.log("%c Got all data from response", 'color: #66cc33;font-weight: bold;');
                            
                            /*  response.forEach((item, i) => {
                                item["generate"] = LH.frontJsonData.generate;
                                
                                LH.allData.push( item);
                                LH.generateLH( item, i,"");
                                LH.generateLH( item, i,"bg");
                                
                            }); */ 
                            $(".loader").css("display","block")
                            response.data.forEach((item, i) => {
                                item.template_code["generate"] = LH.frontJsonData.generate;
                                
                                LH.allData.push( item.template_code);
                                LH.generateLH( item.template_code, i,"");
                                LH.generateLH( item.template_code, i,"bg");
                                
                            });
                            LH.firstRender();
                        },
                        error: function (xhr, status) {
                            console.log(" %c error", 'color: #bada55', xhr, status);
                        }
                    });
                    
                    
                },
                error: function (xhr, status) {
                    console.log(" %c error", 'color: #bada55', xhr, status);
                }
            });
            $(".LHDetails input").keyup((e) => {
                t = e.target;
                LH.allData.forEach((item, i) => {
                    LH.alignAllTextUpdate(item, i);            
                });
                switch (t.id) {
                    case "fname":
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            var logo = font.getPath((t.value).toUpperCase(), 0, 0, 12);
                            $('#LHSVG svg .fnameContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .fnameContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            
                        }
                    });
                    break;
                    case "lname":
                    
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            var logo = font.getPath((t.value).toUpperCase(), 0, 0, 12);
                            $('#LHSVG svg .lnameContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .lnameContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            
                        }
                    });
                    break;
                    case "designation":
                    
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .designationContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .designationContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            
                        }
                    });
                    
                    break;
                    case "phone":
                    
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .phoneContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .phoneContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            
                            
                        }
                    });
                    
                    break;
                    case "email":
                    
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .emailContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .emailContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            
                        }
                    });
                    
                    break;
                    case "website":
                    var fontNB = LH.normalFont;
                    var webtext = LH.LHjson.website;
                    
                    $('#LHSVG svg').each((i, item) => {
                        
                        
                        new Promise((resolve, reject) => {
                            
                            
                            if ($(item).html().indexOf('<!-- makeBold -->') > -1) {
                                fontNB = LH.heavyFont;
                                webtext = t.value.toUpperCase();
                            } else {
                                fontNB = LH.normalFont;
                                webtext = t.value.toLowerCase();
                            }
                            resolve({ it: item, fnt: fontNB, txt: webtext });
                            //resolve();
                            
                        }).then((arg) => {
                            console.log(arg.fnt)
                            opentype.load(arg.fnt, function (err, font) {
                                if (err) {
                                } else {
                                    
                                    var logo = font.getPath(arg.txt, 0, 0, 12);
                                    $(arg.it).find('.websiteContainerBC').html(logo.toSVG());
                                    LH.LHjson[t.id] = arg.txt;
                                    LH.getSetLocalStorage("LHjson", LH.LHjson);
                                }
                            });
                            
                        });
                    });
                    $('#LHSVG_BG svg').each((i, item) => {
                        
                        
                        new Promise((resolve, reject) => {
                            
                            
                            if ($(item).html().indexOf('<!-- makeBold -->') > -1) {
                                fontNB = LH.heavyFont;
                                webtext = t.value.toUpperCase();
                            } else {
                                fontNB = LH.normalFont;
                                webtext = t.value.toLowerCase();
                            }
                            resolve({ it: item, fnt: fontNB, txt: webtext });
                            //resolve();
                            
                        }).then((arg) => {
                            console.log(arg.fnt)
                            opentype.load(arg.fnt, function (err, font) {
                                if (err) {
                                } else {
                                    
                                    var logo = font.getPath(arg.txt, 0, 0, 12);
                                    $(arg.it).find('.websiteContainerBC').html(logo.toSVG());
                                    LH.LHjson[t.id] = arg.txt;
                                    LH.getSetLocalStorage("LHjson", LH.LHjson);
                                }
                            });
                            
                        });
                    });
                    
                    
                    break;
                    case "address":
                    
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .streetHouseContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .streetHouseContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            
                        }
                    });
                    
                    
                    
                    break;
                    case "street":
                    
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .streetContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .streetContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            // getUpdate(target);
                            
                        }
                    });
                    
                    
                    
                    break;
                    case "city":
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .cityContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .cityContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            // getUpdate(target,"cityContainerBC");
                            
                        }
                    });
                    
                    break;
                    
                    case "state":
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .stateContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .stateContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            // getUpdate(target,"cityContainerBC");
                            
                        }
                    });
                    
                    break;
                    case "CRN":
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .CRNContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .CRNContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            // getUpdate(target,"cityContainerBC");
                            
                        }
                    });
                    
                    break;
                    case "RFC":
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .RFCContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .RFCContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            // getUpdate(target,"cityContainerBC");
                            
                        }
                    });
                    
                    break;
                    case "zip":
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            
                            
                            var logo = font.getPath(t.value, 0, 0, 12);
                            $('#LHSVG svg .zipContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .zipContainerBC').html(logo.toSVG());
                            LH.LHjson[t.id] = t.value;
                            LH.getSetLocalStorage("LHjson", LH.LHjson);
                            // getUpdate(target,"cityContainerBC");
                            
                        }
                    });
                    
                    break;
                    default:
                    break;
                }
                this.allData.forEach((item, i) => {
                    LH.alignAllTextUpdate(item, i);            
                });
                
            });
            $(".LHbutton button").click(function (e) {
                target = e.target.id;
                
                var temp = { front: [], back: [], LHSVG: [], LHSVGBG: [] };
                $('#LHSVG').children().each(function (index) {
                    temp.LHSVG.push($(this).html());
                    
                });
                $('#LHSVG_BG').children().each(function (index) {
                    temp.LHSVGBG.push($(this).html());
                    
                });
                /*  $('#LHSVG').children().each(function (index) {
                    temp.back.push($(this).html());
                }); */
                /*  $('#SVGcontainer').children().each(function (index) {
                    temp.front.push($(this).html());
                }); */
                
                if (target == "pdfGenerate") {
                    $.ajax({
                        url: "gen_pdf.php",
                        type: "POST",
                        crossDomain: true,
                        async: false,
                        data: { "svg_data": JSON.stringify(temp) },
                        //dataType: "json",
                        success: function (response) {
                            console.log("%c Got template data from response", 'color: #ffccff;font-weight: bold;');
                            console.log("%c Your Files Placed in " + response.filepath + " folder", 'color: rgb(162, 19, 245);font-weight: bold;')
                        },
                        error: function (xhr, status) {
                            console.log(" %c error", 'color: #aa5511', xhr, status);
                        }
                    });
                    
                    
                }
            });
        });
    },
    
    genRandomId: function getRandomNumbers() {
        var array = new Uint32Array(1);
        var cryptoObj = window.crypto || window.msCrypto;
        cryptoObj.getRandomValues(array);
        return array[0];
    },      
    generateLH : function (logoObj, i, isBG) {
        
        
        
        var idKey = LH.genRandomId();
        var template = LH.getTemplate(logoObj, i, isBG);
        if (typeof logoObj.generate.templatePath.iconFrameBox === 'undefined') {
            logoObj.generate.iconFrameBox = {};
            logoObj.generate.iconFrameBox.x = 0;
            logoObj.generate.iconFrameBox.y = 0;
            logoObj.generate.iconFrameBoxScale = 1;
            
            logoObj.generate.updates.iconFrameBox = {};
            logoObj.generate.updates.iconFrameBox.x = 0;
            logoObj.generate.updates.iconFrameBox.y = 0;
            logoObj.generate.updates.iconFrameBox.scale = 1;
        }
        
        
        
        if (logoObj.generate.textGradient != "") {
            
            logoObj.generate.mainTextColor = 'url(#textGradient' + idKey + ')';
        }
        if (logoObj.generate.sloganGradient != "") {
            logoObj.generate.sloganTextColor = 'url(#sloganGradient' + idKey + ')';
        }
        if (logoObj.generate.frameGradient != "") {
            logoObj.generate.frameColor = 'url(#frameGradient' + idKey + ')';
        }
        if (logoObj.generate.iconFrameGradient != "") {
            logoObj.generate.iconFrameColor = 'url(#iconFrameGradient' + idKey + ')';
        }
        if (logoObj.generate.iconGradient != "") {
            logoObj.generate.iconColor = 'url(#iconGradient' + idKey + ')';
        }
        if (logoObj.generate.frameFilledGradient != "" && logoObj.generate.templatePath.frameType == "filled") {
            logoObj.generate.frameFilledColor = 'url(#frameGradient' + idKey + ')';
        }
        
        
        if (logoObj.generate.textGradient == "gold") {
            template = template.replace("{{textGradient}}", '<defs><linearGradient id="textGradient' + idKey + '"><stop offset="5%" stop-color="#B68648" /><stop offset="95%" stop-color="#FBF3A3" /></linearGradient></defs>');
        }
        else if (logoObj.generate.textGradient == "silver") {
            template = template.replace("{{textGradient}}", '<defs><linearGradient id="textGradient' + idKey + '"><stop offset="5%" stop-color="#6E6F71" /><stop offset="95%" stop-color="#ECECEC" /></linearGradient></defs>');
        }
        else if (logoObj.generate.textGradient == "bronze") {
            template = template.replace("{{textGradient}}", '<defs><linearGradient id="textGradient' + idKey + '"><stop offset="5%" stop-color="#d64000" /><stop offset="95%" stop-color="#edc5be" /></linearGradient></defs>');
        }
        else {
            template = template.replace("{{textGradient}}", logoObj.generate.textGradient);
        }
        
        if (logoObj.generate.sloganGradient == "gold") {
            
            template = template.replace("{{sloganGradient}}", '<defs><linearGradient id="sloganGradient' + idKey + '"><stop offset="5%" stop-color="#B68648" /><stop offset="95%" stop-color="#FBF3A3" /></linearGradient></defs>');
        }
        else if (logoObj.generate.sloganGradient == "silver") {
            template = template.replace("{{sloganGradient}}", '<defs><linearGradient id="sloganGradient' + idKey + '"><stop offset="5%" stop-color="#6E6F71" /><stop offset="95%" stop-color="#ECECEC" /></linearGradient></defs>');
        }
        else if (logoObj.generate.sloganGradient == "bronze") {
            template = template.replace("{{sloganGradient}}", '<defs><linearGradient id="sloganGradient' + idKey + '"><stop offset="5%" stop-color="#d64000" /><stop offset="95%" stop-color="#edc5be" /></linearGradient></defs>');
        }
        else {
            template = template.replace("{{sloganGradient}}", logoObj.generate.sloganGradient);
        }
        
        if (logoObj.generate.templatePath.frameType == "filled") {
            
            if (logoObj.generate.frameFilledGradient == "gold") {
                template = template.replace("{{frameGradient}}", '<defs><linearGradient id="frameGradient' + idKey + '"><stop offset="5%" stop-color="#B68648" /><stop offset="95%" stop-color="#FBF3A3" /></linearGradient></defs>');
            }
            else if (logoObj.generate.frameFilledGradient == "silver") {
                template = template.replace("{{frameGradient}}", '<defs><linearGradient id="frameGradient' + idKey + '"><stop offset="5%" stop-color="#6E6F71" /><stop offset="95%" stop-color="#ECECEC" /></linearGradient></defs>');
            }
            else if (logoObj.generate.frameFilledGradient == "bronze") {
                template = template.replace("{{frameGradient}}", '<defs><linearGradient id="frameGradient' + idKey + '"><stop offset="5%" stop-color="#d64000" /><stop offset="95%" stop-color="#edc5be" /></linearGradient></defs>');
            }
            else {
                template = template.replace("{{frameGradient}}", logoObj.generate.frameFilledGradient);
            }
        } else {
            if (logoObj.generate.frameGradient == "gold") {
                
                template = template.replace("{{frameGradient}}", '<defs><linearGradient id="frameGradient' + idKey + '"><stop offset="5%" stop-color="#B68648" /><stop offset="95%" stop-color="#FBF3A3" /></linearGradient></defs>');
            }
            else if (logoObj.generate.frameGradient == "silver") {
                template = template.replace("{{frameGradient}}", '<defs><linearGradient id="frameGradient' + idKey + '"><stop offset="5%" stop-color="#6E6F71" /><stop offset="95%" stop-color="#ECECEC" /></linearGradient></defs>');
            }
            else if (logoObj.generate.frameGradient == "bronze") {
                template = template.replace("{{frameGradient}}", '<defs><linearGradient id="frameGradient' + idKey + '"><stop offset="5%" stop-color="#d64000" /><stop offset="95%" stop-color="#edc5be" /></linearGradient></defs>');
            }
            else {
                template = template.replace("{{frameGradient}}", logoObj.generate.frameGradient);
            }
        }
        
        
        if (logoObj.generate.iconFrameGradient == "gold") {
            template = template.replace("{{iconFrameGradient}}", '<defs><linearGradient id="iconFrameGradient' + idKey + '"><stop offset="5%" stop-color="#B68648" /><stop offset="95%" stop-color="#FBF3A3" /></linearGradient></defs>');
            
        }
        else if (logoObj.generate.iconFrameGradient == "silver") {
            template = template.replace("{{iconFrameGradient}}", '<defs><linearGradient id="iconFrameGradient' + idKey + '"><stop offset="5%" stop-color="#6E6F71" /><stop offset="95%" stop-color="#ECECEC" /></linearGradient></defs>');
        }
        else if (logoObj.generate.iconFrameGradient == "bronze") {
            template = template.replace("{{iconFrameGradient}}", '<defs><linearGradient id="iconFrameGradient' + idKey + '"><stop offset="5%" stop-color="#d64000" /><stop offset="95%" stop-color="#edc5be" /></linearGradient></defs>');
        }
        else {
            template = template.replace("{{iconFrameGradient}}", logoObj.generate.iconFrameGradient);
        }
        if (logoObj.generate.templatePath.isIcon == 1 || logoObj.generate.templatePath.isMono == 1) {
            
            if (logoObj.generate.iconGradient == "gold") {
                template = template.replace("{{iconGradient}}", '<defs><linearGradient id="iconGradient' + idKey + '"><stop offset="5%" stop-color="#B68648" /><stop offset="95%" stop-color="#FBF3A3" /></linearGradient></defs>');
            }
            else if (logoObj.generate.iconGradient == "silver") {
                template = template.replace("{{iconGradient}}", '<defs><linearGradient id="iconGradient' + idKey + '"><stop offset="5%" stop-color="#6E6F71" /><stop offset="95%" stop-color="#ECECEC" /></linearGradient></defs>');
            }
            else if (logoObj.generate.iconGradient == "bronze") {
                template = template.replace("{{iconGradient}}", '<defs><linearGradient id="iconGradient' + idKey + '"><stop offset="5%" stop-color="#d64000" /><stop offset="95%" stop-color="#edc5be" /></linearGradient></defs>');
            }
            else {
                template = template.replace("{{iconGradient}}", logoObj.generate.iconGradient);
            }
        }
        
        template = template.replace("{{svgColor}}", "#fff"/* logoObj.generate.bgColor */);
        template = template.replace("{{BGColor}}", logoObj.generate.bgColor);
        template = template.replace("{{textHtml}}", logoObj.generate.logoPath);
        template = template.replace("{{textFill}}", logoObj.generate.mainTextColor);
        
        template = template.replace("{{textfnameFill}}", logoObj.LH_dimension.fnameContainerBC.color ? logoObj.LH_dimension.fnameContainerBC.color : "#000");
        template = template.replace("{{textlnameFill}}", logoObj.LH_dimension.lnameContainerBC.color ? logoObj.LH_dimension.lnameContainerBC.color : "#000");
        template = template.replace("{{textDesigFill}}", logoObj.LH_dimension.designationContainerBC.color ? logoObj.LH_dimension.designationContainerBC.color : "#000");
        template = template.replace("{{textphoneFill}}", logoObj.LH_dimension.phoneContainerBC.color ? logoObj.LH_dimension.phoneContainerBC.color : "#000");
        
        template = template.replace("{{textemailFill}}", logoObj.LH_dimension.emailContainerBC.color ? logoObj.LH_dimension.emailContainerBC.color : "#000");
        template = template.replace("{{textwebFill}}", logoObj.LH_dimension.websiteContainerBC.color ? logoObj.LH_dimension.websiteContainerBC.color : "#000");
        template = template.replace("{{textstreetHouseFill}}", logoObj.LH_dimension.streetHouseContainerBC.color ? logoObj.LH_dimension.streetHouseContainerBC.color : "#000");
        template = template.replace("{{textstreetFill}}", logoObj.LH_dimension.streetContainerBC.color ? logoObj.LH_dimension.streetContainerBC.color : "#000");
        template = template.replace("{{textcityFill}}", logoObj.LH_dimension.cityContainerBC.color ? logoObj.LH_dimension.cityContainerBC.color : "#000");
        template = template.replace("{{textstateFill}}", logoObj.LH_dimension.stateContainerBC.color ? logoObj.LH_dimension.stateContainerBC.color : "#000");
        template = template.replace("{{textCRNFill}}", logoObj.LH_dimension.CRNContainerBC.color ? logoObj.LH_dimension.CRNContainerBC.color : "#000");
        template = template.replace("{{textRFCFill}}", logoObj.LH_dimension.RFCContainerBC.color ? logoObj.LH_dimension.RFCContainerBC.color : "#000");
        template = template.replace("{{textzipFill}}", logoObj.LH_dimension.zipContainerBC.color ? logoObj.LH_dimension.zipContainerBC.color : "#000");
        
        
        if (logoObj.LH_dimension.fnameContainerBC.x && logoObj.LH_dimension.fnameContainerBC.y) {
            template = template.replace("{{textfnameX}},{{textfnameY}}", logoObj.LH_dimension.fnameContainerBC.x,logoObj.LH_dimension.fnameContainerBC.y);
        } else {
            template = template.replace("{{textfnameX}},{{textfnameY}}", "");
        }
        if (logoObj.LH_dimension.lnameContainerBC.x && logoObj.LH_dimension.lnameContainerBC.y) {
            template = template.replace("{{textlnameX}},{{textlnameY}}", logoObj.LH_dimension.lnameContainerBC.x,logoObj.LH_dimension.lnameContainerBC.y);
        } else {
            template = template.replace("{{textlnameX}},{{textlnameY}}", "");
        }
        if (logoObj.LH_dimension.designationContainerBC.x && logoObj.LH_dimension.designationContainerBC.y) {
            template = template.replace("{{textDesigX}},{{textDesigY}}", logoObj.LH_dimension.designationContainerBC.x,logoObj.LH_dimension.designationContainerBC.y);
        } else {
            template = template.replace("{{textDesigX}},{{textDesigY}}", "");
        }
        
        if (logoObj.LH_dimension.phoneContainerBC.x && logoObj.LH_dimension.phoneContainerBC.y) {
            template = template.replace("{{textphoneX}},{{textphoneY}}", logoObj.LH_dimension.phoneContainerBC.x,logoObj.LH_dimension.phoneContainerBC.y);
        } else {
            template = template.replace("{{textphoneX}},{{textphoneY}}", "");
        }
        
        
        if (logoObj.LH_dimension.emailContainerBC.x && logoObj.LH_dimension.emailContainerBC.y) {
            template = template.replace("{{textemailX}},{{textemailY}}", logoObj.LH_dimension.emailContainerBC.x,logoObj.LH_dimension.emailContainerBC.y);
        } else {
            template = template.replace("{{textemailX}},{{textemailY}}", "");
        }
        
        
        if (logoObj.LH_dimension.websiteContainerBC.x && logoObj.LH_dimension.websiteContainerBC.y) {
            template = template.replace("{{textwebX}},{{textwebY}}", logoObj.LH_dimension.websiteContainerBC.x,logoObj.LH_dimension.websiteContainerBC.y);
        } else {
            template = template.replace("{{textwebX}},{{textwebY}}", "");
        }
        
        if (logoObj.LH_dimension.streetHouseContainerBC.x && logoObj.LH_dimension.streetHouseContainerBC.y) {
            template = template.replace("{{textstreetHouseX}},{{textstreetHouseY}}", logoObj.LH_dimension.streetHouseContainerBC.x,logoObj.LH_dimension.streetHouseContainerBC.y);
        } else {
            template = template.replace("{{textstreetHouseX}},{{textstreetHouseY}}", "");
        }
        if (logoObj.LH_dimension.streetContainerBC.x && logoObj.LH_dimension.streetContainerBC.y) {
            template = template.replace("{{textstreetX}},{{textstreetY}}", logoObj.LH_dimension.streetContainerBC.x,logoObj.LH_dimension.streetContainerBC.y);
        } else {
            template = template.replace("{{textstreetX}},{{textstreetY}}", "");
        }
        
        if (logoObj.LH_dimension.cityContainerBC.x && logoObj.LH_dimension.cityContainerBC.y) {
            template = template.replace("{{textcityX}},{{textcityY}}", logoObj.LH_dimension.cityContainerBC.x,logoObj.LH_dimension.cityContainerBC.y);
        } else {
            template = template.replace("{{textcityX}},{{textcityY}}", "");
        }
        
        if (logoObj.LH_dimension.stateContainerBC.x && logoObj.LH_dimension.stateContainerBC.y) {
            template = template.replace("{{textstateX}},{{textstateY}}", logoObj.LH_dimension.stateContainerBC.x,logoObj.LH_dimension.stateContainerBC.y);
        } else {
            template = template.replace("{{textstateX}},{{textstateY}}", "");
        }
        
        if (logoObj.LH_dimension.CRNContainerBC.x && logoObj.LH_dimension.CRNContainerBC.y) {
            template = template.replace("{{textCRNX}},{{textCRNY}}", logoObj.LH_dimension.CRNContainerBC.x,logoObj.LH_dimension.CRNContainerBC.y);
        } else {
            template = template.replace("{{textCRNX}},{{textCRNY}}", "");
        }
        if (logoObj.LH_dimension.RFCContainerBC.x && logoObj.LH_dimension.RFCContainerBC.y) {
            template = template.replace("{{textRFCX}},{{textRFCY}}", logoObj.LH_dimension.RFCContainerBC.x,logoObj.LH_dimension.RFCContainerBC.y);
        } else {
            template = template.replace("{{textRFCX}},{{textRFCY}}", "");
        }
        if (logoObj.LH_dimension.zipContainerBC.x && logoObj.LH_dimension.zipContainerBC.y) {
            template = template.replace("{{textzipX}},{{textzipY}}", logoObj.LH_dimension.zipContainerBC.x,logoObj.LH_dimension.zipContainerBC.y);
        } else {
            template = template.replace("{{textzipX}},{{textzipY}}", "");
        }
        
        if (logoObj.LH_dimension.lines.length) {
            var ttempp = "";
            $.each(logoObj.LH_dimension.lines, (index, value) => {
                ttempp += value;
            });
            template = template.replace("<!-- lines -->", ttempp);
            
        }
        
        if (logoObj.LH_dimension.phoneContainerBC.symbol !== "" && logoObj.LH_dimension.phoneContainerBC.symbol !== undefined) {
            template = template.replace("<!-- phoneSymbol -->", logoObj.LH_dimension.phoneContainerBC.symbol);
        }
        if (logoObj.LH_dimension.emailContainerBC.symbol !== "" && logoObj.LH_dimension.emailContainerBC.symbol !== undefined) {
            template = template.replace("<!-- emailSymbol -->", logoObj.LH_dimension.emailContainerBC.symbol);
        }
        if (logoObj.LH_dimension.websiteContainerBC.symbol !== "" && logoObj.LH_dimension.websiteContainerBC.symbol !== undefined) {
            template = template.replace("<!-- websiteSymbol -->", logoObj.LH_dimension.websiteContainerBC.symbol);
        }
        if (logoObj.LH_dimension.streetHouseContainerBC.symbol !== "" && logoObj.LH_dimension.streetHouseContainerBC.symbol !== undefined) {
            template = template.replace("<!-- addressSymbol -->", logoObj.LH_dimension.streetHouseContainerBC.symbol);
        }
        if (logoObj.LH_dimension.cityContainerBC.symbol !== "" && logoObj.LH_dimension.cityContainerBC.symbol !== undefined) {
            template = template.replace("<!-- citySymbol -->", logoObj.LH_dimension.cityContainerBC.symbol);
        }
        if (logoObj.LH_dimension.stateContainerBC.symbol !== "" && logoObj.LH_dimension.stateContainerBC.symbol !== undefined) {
            template = template.replace("<!-- stateSymbol -->", logoObj.LH_dimension.stateContainerBC.symbol);
        }
        if (logoObj.LH_dimension.CRNContainerBC.symbol !== "" && logoObj.LH_dimension.CRNContainerBC.symbol !== undefined) {
            template = template.replace("<!-- CRNSymbol -->", logoObj.LH_dimension.CRNContainerBC.symbol);
        }
        if (logoObj.LH_dimension.RFCContainerBC.symbol !== "" && logoObj.LH_dimension.RFCContainerBC.symbol !== undefined) {
            template = template.replace("<!-- RFCSymbol -->", logoObj.LH_dimension.RFCContainerBC.symbol);
        }
        if (logoObj.LH_dimension.zipContainerBC.symbol !== "" && logoObj.LH_dimension.zipContainerBC.symbol !== undefined) {
            template = template.replace("<!-- zipSymbol -->", logoObj.LH_dimension.zipContainerBC.symbol);
        }
        
        
        
        template = template.replace("{{sloganHtml}}", logoObj.generate.sloganPath);
        template = template.replace("{{sloganFill}}", logoObj.generate.sloganTextColor);
        
        template = template.replace("{{frameHtml}}", logoObj.generate.framePath);
        
        if (logoObj.generate.templatePath.frameType == "filled") {
            //	alert(logoObj.frameFilledColor);
            template = template.replace("{{frameFill}}", logoObj.generate.frameFilledColor);
        } else {
            template = template.replace("{{frameFill}}", logoObj.generate.frameColor);
        }
        if (logoObj.generate.templatePath.isIcon == 1 || logoObj.generate.templatePath.isMono == 1) {
            template = template.replace("{{iconHtml}}", logoObj.generate.iconPath);
            template = template.replace("{{iconFill}}", logoObj.generate.iconColor);
            template = template.replace("{{iconX}}", logoObj.generate.templatePath.icon.x);
            template = template.replace("{{iconY}}", logoObj.generate.templatePath.icon.y);
            template = template.replace("{{iconScale}}", logoObj.generate.templatePath.icon.scale);
            template = template.replace("{{iconFrameFill}}", logoObj.generate.iconFrameColor);
            template = template.replace("{{iconFrameBoxX}}", logoObj.generate.templatePath.iconFrameBox.x);
            template = template.replace("{{iconFrameBoxY}}", logoObj.generate.templatePath.iconFrameBox.y);
            if (logoObj.generate.templatePath.iconFrameBox.Scale) {
                template = template.replace("{{iconFrameBoxScale}}", logoObj.generate.templatePath.iconFrameBox.Scale);
            } else {
                template = template.replace("scale({{iconFrameBoxScale}})", "");
            }
            
        }
        if (logoObj.generate.templatePath.isIconFrame == 1) {
            template = template.replace("{{iconFrameHtml}}", logoObj.generate.iconFramePath);
            template = template.replace("{{iconFrameFill}}", logoObj.generate.bgColor);
            template = template.replace("{{iconFrameX}}", logoObj.generate.templatePath.iconFrame.x);
            template = template.replace("{{iconFrameY}}", logoObj.generate.templatePath.iconFrame.y);
            if (logoObj.generate.templatePath.iconFrame.scale) {
                template = template.replace("{{iconFrameScale}}", logoObj.generate.templatePath.iconFrame.scale);
            } else {
                template = template.replace("scale({{iconFrameScale}})", "");
            }
            
        }
        
        
        template = template.replace("{{textX}}", logoObj.generate.templatePath.text.x);
        template = template.replace("{{textY}}", logoObj.generate.templatePath.text.y);
        template = template.replace("{{textScale}}", logoObj.generate.templatePath.text.scale);
        
        template = template.replace("{{sloganX}}", logoObj.generate.templatePath.slogan.x);
        template = template.replace("{{sloganY}}", logoObj.generate.templatePath.slogan.y);
        template = template.replace("{{sloganScale}}", logoObj.generate.templatePath.slogan.scale);
        
        template = template.replace("{{textAndSloganX}}", logoObj.generate.templatePath.textAndSlogan.x);
        template = template.replace("{{textAndSloganY}}", logoObj.generate.templatePath.textAndSlogan.y);
        template = template.replace("{{textAndSloganScale}}", logoObj.generate.templatePath.textAndSlogan.scale);
        
        template = template.replace("{{containerBodyX}}", logoObj.generate.templatePath.containerBody.x);
        template = template.replace("{{containerBodyY}}", logoObj.generate.templatePath.containerBody.y);
        template = template.replace("{{containerBodyScale}}", logoObj.generate.templatePath.containerBody.scale);
        
        
        
        template = template.replace("{{frameX}}", logoObj.generate.templatePath.frame.x);
        template = template.replace("{{frameY}}", logoObj.generate.templatePath.frame.y);
        template = template.replace("{{frameScale}}", logoObj.generate.templatePath.frame.scale);
        
        template = template.replace("{{logoContainerX}}", logoObj.LH_dimension.logoContainerBack.x);
        template = template.replace("{{logoContainerY}}", logoObj.LH_dimension.logoContainerBack.y);
        template = template.replace("{{logoContainerScale}}", logoObj.LH_dimension.logoContainerBack.scale);
        
        
        if(isBG===undefined||isBG===""){
            
            $('#LHSVG').append('<div id=LHSVG_'+i+'>'+template+'</div>');
            LH.updateGroupSize($('#LHSVG #LHSVG_'+i).find(".logoContainerBox"), logoObj, "logoContainerBack", 0);
            LH.alignAllTextUpdate(logoObj, i);
            
        }else{
            
            $('#LHSVG_BG').append('<div id=LHSVG_BG_'+i+'>'+template+'</div>');
            LH.updateGroupSize($('#LHSVG_BG #LHSVG_BG_'+i).find(".logoContainerBox"), logoObj, "logoContainerBack", 0);
            var lhnew = $('#LHSVG_BG #LHSVG_BG_'+i);
            
            if(lhnew.find("#LHBG").length){
                var padding  = 20;
                var newDims = getNewDims($(lhnew).find('.logoContainerBox'),logoObj);
                lhnew.find('#LHBG').attr("x", newDims.x);
                lhnew.find('#LHBG').attr("y", LH.svgSafeArea);
                lhnew.find('#LHBG').attr("width" ,newDims.width);
                lhnew.find('#LHBG').attr("height", newDims.height);
            }
            LH.updateGroupSize($('#LHSVG_BG #LHSVG_BG_'+i).find("#LHBG"), logoObj, "logoContainerBack", 0);
            LH.alignAllTextUpdate(logoObj, i);
            
        }
        
        function getNewDims(logoContainerObject,logoObj){
            var obj = {};
            var logoContainerOBJ = $(logoContainerObject);
            var containerBodyOBJ = $(logoContainerObject).find('.containerBody');
            var dim1 = getDimArry(logoContainerOBJ);
            var dim2 = getDimArry(containerBodyOBJ);        
            
            obj['x'] = ((dim1[1]>-1?dim1[1]:dim1[1]*-1)*logoObj.LH_dimension.logoContainerBack.scale)+((dim2[1]>-1?dim2[1]:dim2[1]*-1)*logoObj.generate.templatePath.containerBody.scale);
            obj['y'] = ((dim1[2]>-1?dim1[2]:dim1[2]*-1)*logoObj.LH_dimension.logoContainerBack.scale)+((dim2[2]>-1?dim2[2]:dim2[2]*-1)*logoObj.generate.templatePath.containerBody.scale);
            obj['width'] = ($(logoContainerOBJ).get(0).getBBox().width*logoObj.LH_dimension.logoContainerBack.scale)+20;
            obj['height'] = ($(logoContainerOBJ).get(0).getBBox().height*logoObj.LH_dimension.logoContainerBack.scale)+20;
            return obj;
            
        }
        function getDimArry(object){
            var prevEle = object
            var regex = /\.*translate\((.*),(.*)\)/i;
            var tranfroms = prevEle.attr('transform');
            var res = tranfroms.match(regex);
            return res;
        }
        
        
    },
    getTemplate : function(logoObj, index, isBG) {
        var template = '<svg  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" width="'+logoObj.cardWidth / 96+'in" height="'+(logoObj.cardHeight / 96)+'in"  viewBox="0 0 '+logoObj.cardWidth+' '+logoObj.cardHeight+'" >{{textGradient}}{{sloganGradient}}{{iconGradient}}{{frameGradient}}{{iconFrameGradient}}';
        
        template += '<rect x="0px" y="0px" width="100%" height="100%" fill="{{svgColor}}"/>';
        if(isBG!=undefined&&isBG!==""){
            
            template += '<rect id="LHBG" x="0px" y="0px" width="10%" height="10%" fill="{{BGColor}}"/>';
        }
        template += '<g class="logo-container-box logoContainerBox" transform="scale({{logoContainerScale}}) translate({{logoContainerX}},{{logoContainerY}})">';
        
        if (logoObj.generate.templatePath.isFrame == 1) {
            template += '<g class="container_1" transform="scale({{frameScale}}) translate({{frameX}},{{frameY}})"  fill="{{frameFill}}">{{frameHtml}}</g>';
        }
        template += '<g class="containerBody" transform="scale({{containerBodyScale}}) translate({{containerBodyX}},{{containerBodyY}})" >';
        if (logoObj.generate.templatePath.isIcon == 1 || logoObj.generate.templatePath.isMono == 1) {
            template += '<g class="sampleIconBox" transform="scale({{iconFrameBoxScale}}) translate({{iconFrameBoxX}},{{iconFrameBoxY}})">';
            if (logoObj.generate.templatePath.isIconFrame == 1) {
                template += '<g class="iconFrame" transform="scale({{iconFrameScale}}) translate({{iconFrameX}},{{iconFrameY}})"  fill="{{iconFrameFill}}">{{iconFrameHtml}}</g>';
            }
            template += '<g class="sampleIcons_1" transform="scale({{iconScale}}) translate({{iconX}},{{iconY}})" fill="{{iconFill}}">{{iconHtml}}</g>';
            template += '</g>';
        }
        template += '<g class="sampleTexts_1" transform="scale({{textAndSloganScale}}) translate({{textAndSloganX}},{{textAndSloganY}})">';
        template += '<g class="logo--name svgLogoName_1 logoNameBox" transform="scale({{textScale}}) translate({{textX}},{{textY}})" fill="{{textFill}}">{{textHtml}}</g>';
        template += '<g id="slogon" class="logo--name svgSloganText_1 sloganBox" transform="scale({{sloganScale}}) translate({{sloganX}},{{sloganY}})" fill="{{sloganFill}}">{{sloganHtml}}</g>';
        template += '</g>';
        template += '</g>';
        template += '</g>';
        template += '<!-- lines -->';
        template += '<g class="fnameContainerBC" transform="translate({{textfnameX}},{{textfnameY}})" fill="{{textfnameFill}}"></g>';
        template += '<g class="lnameContainerBC" transform="translate({{textlnameX}},{{textlnameY}})" fill="{{textlnameFill}}"></g>';
        template += '<g class="designationContainerBC" transform="translate({{textDesigX}},{{textDesigY}})" fill="{{textDesigFill}}"></g>';
        template += '<!-- phoneSymbol -->';
        template += '<g class="phoneContainerBC" transform="translate({{textphoneX}},{{textphoneY}})" fill="{{textphoneFill}}"></g>';
        
        template += '<!-- emailSymbol -->';
        (logoObj.LH_dimension != undefined && logoObj.LH_dimension.websiteContainerBC.font != undefined) ? template += '<!-- makeBold -->' : '';
        template += '<g class="emailContainerBC" transform="translate({{textemailX}},{{textemailY}})" fill="{{textemailFill}}"></g>';
        template += '<!-- websiteSymbol -->';
        template += '<g class="websiteContainerBC" transform="translate({{textwebX}},{{textwebY}})" fill="{{textwebFill}}"></g>';
        template += '<!-- addressSymbol -->';
        template += '<g class="streetHouseContainerBC" transform="translate({{textstreetHouseX}},{{textstreetHouseY}})" fill="{{textstreetHouseFill}}"></g>';
        template += '<g class="streetContainerBC" transform="translate({{textstreetX}},{{textstreetY}})" fill="{{textstreetFill}}"></g>';
        template += '<!-- citySymbol -->';
        template += '<g class="cityContainerBC" transform="translate({{textcityX}},{{textcityY}})" fill="{{textcityFill}}"></g>';
        template += '<!-- stateSymbol -->';
        template += '<g class="stateContainerBC" transform="translate({{textstateX}},{{textstateY}})" fill="{{textstateFill}}"></g>';
        template += '<!-- CRNSymbol -->';
        template += '<g class="CRNContainerBC" transform="translate({{textCRNX}},{{textCRNY}})" fill="{{textCRNFill}}"></g>';
        template += '<!-- RFCSymbol -->';
        template += '<g class="RFCContainerBC" transform="translate({{textRFCX}},{{textRFCY}})" fill="{{textRFCFill}}"></g>';
        template += '<!-- zipSymbol -->';
        template += '<g class="zipContainerBC" transform="translate({{textzipX}},{{textzipY}})" fill="{{textzipFill}}"></g>';
        template += '</svg>';
        return template;
    },
    
    firstRender :function () {
        var promiseAll =[];
        if (LH.LHjson != {}) {
            if (LH.LHjson.fname) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#fname').val(LH.LHjson.fname.toUpperCase())
                            var logo = font.getPath(LH.LHjson.fname?LH.LHjson.fname.toUpperCase():LH.LHjson.fname, 0, 0, 12);
                            $('#LHSVG svg .fnameContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .fnameContainerBC').html(logo.toSVG());
                            success();
                        }
                    });
                }));
            }
            if (LH.LHjson.lname) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#lname').val(LH.LHjson.name?LH.LHjson.lname.toUpperCase():LH.LHjson.lname);
                            var logo = font.getPath(LH.LHjson.lname?LH.LHjson.lname.toUpperCase():LH.LHjson.lname, 0, 0, 12);
                            $('#LHSVG svg .lnameContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .lnameContainerBC').html(logo.toSVG());
                            success();
                        }
                    });
                }));
            }
            if (LH.LHjson.designation) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#designation').val(LH.LHjson.designation)
                            var logo = font.getPath(LH.LHjson.designation, 0, 0, 12);
                            $('#LHSVG svg .designationContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .designationContainerBC').html(logo.toSVG());
                            success();
                        }
                    });
                }));
            }
            if (LH.LHjson.phone) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#phone').val(LH.LHjson.phone);
                            var logo = font.getPath(LH.LHjson.phone, 0, 0, 12);
                            $('#LHSVG svg .phoneContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .phoneContainerBC').html(logo.toSVG());
                            success();
                        }
                    });
                }));
            }
            if (LH.LHjson.email) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#email').val(LH.LHjson.email);
                            var logo = font.getPath(LH.LHjson.email, 0, 0, 12);
                            $('#LHSVG svg .emailContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .emailContainerBC').html(logo.toSVG());
                            success();
                        }
                    });
                }));
            }
            if (LH.LHjson.website) {
                var fontNB = LH.normalFont;
                var webtext = LH.LHjson.website;
                promiseAll.push(new Promise((success,fail)=>{
                    $('#LHSVG svg').each((i, item) => {
                        
                        
                        new Promise((resolve, reject) => {
                            
                            
                            if ($(item).html().indexOf('<!-- makeBold -->') > -1) {
                                fontNB = LH.heavyFont;
                                webtext = LHjson.website.toUpperCase();
                            } else {
                                fontNB = LH.normalFont;
                                webtext = LH.LHjson.website.toLowerCase();
                            }
                            resolve({ it: item, fnt: fontNB, txt: webtext });
                            //resolve();
                            
                        }).then((arg) => {
                            console.log(arg.fnt)
                            opentype.load(arg.fnt, function (err, font) {
                                if (err) {
                                } else {
                                    $('#website').val(arg.txt);
                                    var logo = font.getPath(arg.txt, 0, 0, 12);
                                    $(arg.it).find('.websiteContainerBC').html(logo.toSVG());
                                    success();
                                }
                            });
                            
                        });
                    });
                    $('#LHSVG_BG svg').each((i, item) => {
                        
                        
                        new Promise((resolve, reject) => {
                            
                            
                            if ($(item).html().indexOf('<!-- makeBold -->') > -1) {
                                fontNB = LH.heavyFont;
                                webtext = LHjson.website.toUpperCase();
                            } else {
                                fontNB = LH.normalFont;
                                webtext = LH.LHjson.website.toLowerCase();
                            }
                            resolve({ it: item, fnt: fontNB, txt: webtext });
                            //resolve();
                            
                        }).then((arg) => {
                            console.log(arg.fnt)
                            opentype.load(arg.fnt, function (err, font) {
                                if (err) {
                                } else {
                                    $('#website').val(arg.txt);
                                    var logo = font.getPath(arg.txt, 0, 0, 12);
                                    $(arg.it).find('.websiteContainerBC').html(logo.toSVG());
                                    success();
                                }
                            });
                            
                        });
                    });
                }));
            }
            if (LH.LHjson.address) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#address').val(LH.LHjson.address);
                            var logo = font.getPath(LH.LHjson.address, 0, 0, 12);
                            $('#LHSVG svg .streetHouseContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .streetHouseContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
            }
            if (LH.LHjson.street) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#street').val(LH.LHjson.street);
                            var logo = font.getPath(LH.LHjson.street, 0, 0, 12);
                            $('#LHSVG svg .streetContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .streetContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
            }
            
            if (LH.LHjson.city) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#city').val(LH.LHjson.city);
                            var logo = font.getPath(LH.LHjson.city, 0, 0, 12);
                            $('#LHSVG svg .cityContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .cityContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
            }
            
            if (LH.LHjson.state) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#state').val(LH.LHjson.state);
                            var logo = font.getPath(LH.LHjson.state, 0, 0, 12);
                            $('#LHSVG svg .stateContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .stateContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
            }
            if (LH.LHjson.CRN) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#CRN').val(LH.LHjson.CRN);
                            var logo = font.getPath(LH.LHjson.CRN, 0, 0, 12);
                            $('#LHSVG svg .CRNContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .CRNContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
            }
            if (LH.LHjson.RFC) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#RFC').val(LH.LHjson.RFC);
                            var logo = font.getPath(LH.LHjson.RFC, 0, 0, 12);
                            $('#LHSVG svg .RFCContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .RFCContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
                
            }
            
            if (LH.LHjson.zip) {
                promiseAll.push(new Promise((success,fail)=>{
                    opentype.load(LH.normalFont, function (err, font) {
                        if (err) {
                        } else {
                            $('#zip').val(LH.LHjson.zip);
                            var logo = font.getPath(LH.LHjson.zip, 0, 0, 12);
                            $('#LHSVG svg .zipContainerBC').html(logo.toSVG());
                            $('#LHSVG_BG svg .zipContainerBC').html(logo.toSVG());
                            success();
                            
                        }
                    });
                }));
            }
            
            Promise.all(promiseAll).then(_=>{
                this.allData.forEach((item, i) => {
                    LH.alignAllTextUpdate(item, i);
                });
            });      
        }
    }, 
    
    alignAllTextUpdate :  function(logoObj, i ) {
        
        logoObj.LH_dimension.TextFormat.forEach((item) => {
            setTimeout(() => {
                LH.alignBCText($('#LHSVG #LHSVG_'+i), logoObj, item)
                LH.alignBCText($('#LHSVG_BG #LHSVG_BG_'+i), logoObj, item)
                $(".loader").css("display","none") 
            },5000);
        });     
        
        /*  myRecursiveFunction(logoObj.LH_dimension.TextFormat,-1,i)      
        function myRecursiveFunction(item,j,i){
            j++;
            if(item.length>j){
                LH.alignBCText($('#LHSVG #LHSVG_'+i), logoObj, item[j]).then(_=>{                    
                    LH.alignBCText($('#LHSVG_BG #LHSVG_BG_'+i), logoObj, item[j]).then(_=>{
                        debugger
                        myRecursiveFunction(item,j,i);                        
                    });
                });
            }else{
                return 'done';
            }
            
        } */
    },
    
    getSetLocalStorage :function(key, value) {
        if (key && value) {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        }
        if (key && !value) {
            return localStorage.getItem(key);
        }
        return;
        
    },
    
    updateGroupSize : function(object, template, type, size) {
        let padding = 80;
        if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
            dimension = template.LH_dimension[type];
            
        } else {
            dimension = template.generate.templatePath[type];
        }
        if(object[0].id=="LHBG"){
            object.attr("width" ,  $($(object[0]).parents()[0]).find('.logoContainerBox')[0].getBBox().width+padding);
            object.attr("height" , $($(object[0]).parents()[0]).find('.logoContainerBox')[0].getBBox().height+padding);
        }
        var scale = 1;
        var bbox = object.get(0).getBBox();
        var x = 0;
        var y = 0;
        var oscale = dimension.scale;
        
        
        scale = scale + (size / 100);
        
        if (dimension.xType == 'left') {
            
            x = ((template.cardWidth * dimension.widthStart / 100) / oscale * 100 - bbox.x * oscale) + (LH.svgSafeArea + (LH.svgSafeArea * oscale));
        } else if (dimension.xType == 'center') {
            x = ((template.cardWidth * dimension.widthPercent / 100) + (template.cardWidth * dimension.widthStart / 100)) / (2 * oscale) - ((bbox.width) / 2) - bbox.x;
        } else if (dimension.xType == 'right') {
            x = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / oscale - bbox.width - bbox.x) - 250 + (object[0].id=="LHBG"?padding*0.5:0);
        }
        
        if (dimension.yType == 'up') {
            y = (((template.cardHeight * dimension.heightStart / 100)) / oscale - bbox.y) + 150 + LH.svgSafeArea - (object[0].id=="LHBG"?padding*0.5:0);
        } else if (dimension.yType == 'center') {
            y = (template.cardHeight * dimension.heightStart / 100 + template.cardHeight * dimension.heightPercent / 100) / (2 * oscale) - bbox.height / 2 - bbox.y;
        } else if (dimension.yType == 'down') {
            y = ((template.cardHeight * dimension.heightStart / 100) + (template.cardHeight * dimension.heightPercent / 100)) / oscale - (bbox.height) - bbox.y;
        }
        object.attr('transform', "scale(" + oscale + ") translate(" + x + "," + (y + LH.svgSafeArea) + ")");
        
        
        
        
    },
    
    alignBCText:async function(object, template, type, size) {
        var marginX = LH.svgSafeArea;
        var marginY = LH.svgSafeArea;
        var newX = LH.svgSafeArea;
        var newY = 0;
        var margin = 6;
        var rotate = 0;
        var lastPointX = 0;
        var lastPointY = 0;
        var totalheightOfAllChunk = 0;
        if (Array.isArray(type)) {
            
            type.forEach((chunk) => {
                var temp = $(object).find("." + chunk);
                var marginsymbol = template.LH_dimension[chunk].symbol ? $(object).find("#" + template.LH_dimension[chunk].symbolName).get(0).getBBox().width+4 : 0;
                if ($(temp).html() != "" && $(temp).html() != "<path d=\"\"></path>") {
                    
                    lastPointX += temp.get(0).getBBox().x + temp.get(0).getBBox().width + margin + marginsymbol;
                    
                }
                
                
                
            });
            
            type.forEach((item, i) => {
                
                var y = template.LH_dimension[item].y;
                if (template.viewType === 'center') {
                    
                    var temp = $(object).find("." + item);
                    var dimension = template.LH_dimension[item];
                    if (i === 0) {
                        
                        if (template.LH_dimension.art != "" && template.LH_dimension.art != undefined) {
                            var aaaa = $(object).find('svg #art')?$(object).find('svg #art').remove():null;
                            var newg = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            newg.setAttribute("id","art");
                            newg.setAttribute("width","100%");
                            newg.setAttribute("height","100%");
                            newg.innerHTML = template.LH_dimension.art
                            $(object).find('svg')[0].appendChild(newg);
                            
                            
                        }
                        type.forEach((chunk) => {
                            var temp = $(object).find("." + chunk);
                            if ($(temp).html() != "" && $(temp).html() != "<path d=\"\"></path>") {
                                lastPointY += temp.get(0).getBBox().y + temp.get(0).getBBox().height + margin;
                                
                            }
                            
                            if (dimension.yType == 'down') {
                                
                                newY = template.cardHeight - lastPointY - LH.svgSafeArea;
                            } else if (dimension.yType == 'up') {
                                newY = LH.svgSafeArea;
                            } else if (dimension.yType == 'center') {
                                newY = (template.cardHeight * 0.5) - (lastPointY * 0.5) + LH.svgSafeArea;
                            }
                            else {
                                newY = dimension.y
                            }
                            newX = ((template.cardWidth * 0.5) - (lastPointX * 0.5));
                            
                        });
                        if (dimension.follow != "" && dimension.follow != undefined) {
                            var prevEle = $(object).find("." + dimension.follow)
                            var regex = /\.*translate\((.*),(.*)\)/i;
                            var tranfroms = prevEle.attr('transform');
                            var res = tranfroms.match(regex);
                            marginX = prevEle.get(0).getBBox().width + parseInt(res[1]) + margin;
                            // prevEle.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                            newY = prevEle.get(0).getBBox().y
                            
                        }
                        
                        if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                            if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                var symbolnew = $(object).find("#" + dimension.symbolName)
                                symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + (newX) + "," + newY + ")");
                                newX += (8+symbolnew.get(0).getBBox().width);
                            } else {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                            }
                        }
                        
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            temp.get(0).getBBox().x = newX;
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                            newX += temp.get(0).getBBox().width + margin;
                        }
                        
                    } else {
                        
                        if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                            if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d);
                                var symbolnew = $(object).find("#" + dimension.symbolName)
                                symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                                newX += 8;
                            } else {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                            }
                        }
                        
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            temp.get(0).getBBox().x = newX;
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                            newX += temp.get(0).getBBox().width + margin;
                        }
                    }
                } else if (template.viewType === 'left') {
                    var temp = $(object).find("." + item);
                    var bbox = temp.get(0).getBBox();
                    if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
                        dimension = template.LH_dimension[item];
                    } else {
                        dimension = template.generate.templatePath[item];
                    }
                    
                    var y = template.LH_dimension[item].y;
                    var x = 0;
                    
                    
                    if (!dimension.rotate) {
                        
                        if (i === 0) {
                            
                            if (template.LH_dimension.art != "" && template.LH_dimension.art != undefined) {
                                var aaaa = $(object).find('svg #art')?$(object).find('svg #art').remove():null;
                                var newg = document.createElementNS("http://www.w3.org/2000/svg", "g");
                                newg.setAttribute("id","art")
                                newg.setAttribute("width","100%");
                                newg.setAttribute("height","100%");
                                newg.innerHTML = template.LH_dimension.art
                                $(object).find('svg')[0].appendChild(newg);
                                
                                
                            }
                            if (dimension.xType == 'left') {
                                marginX = ((template.cardWidth * dimension.widthStart / 100) / dimension.scale * 100 - bbox.x * dimension.scale) + marginX;
                            } else if (dimension.xType == 'center') {
                                marginX = bbox.x + ((template.cardWidth * 0.5) - (bbox.width * 0.5));
                            } else if (dimension.xType == 'right') {
                                marginX = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / dimension.scale - bbox.width - bbox.x) - 30;
                            }
                            
                            if (dimension.yType == 'down') {                                
                                newY = template.cardHeight - lastPointY - LH.svgSafeArea;
                            } else if (dimension.yType == 'up') {
                                newY = LH.svgSafeArea;
                            } else if (dimension.yType == 'center') {
                                newY = (template.cardHeight * 0.5) - (lastPointY * 0.5) + LH.svgSafeArea;
                            }
                            else {
                                newY = dimension.y
                            }
                            
                            if (dimension.follow != "" && dimension.follow != undefined) {
                                var prevEle = $(object).find("." + dimension.follow)
                                var regex = /\.*translate\((.*),(.*)\)/i;
                                var tranfroms = prevEle.attr('transform');
                                var res = tranfroms.match(regex);
                                marginX = prevEle.get(0).getBBox().width + parseInt(res[1]) + margin;
                                // prevEle.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                                newY = prevEle.get(0).getBBox().y
                                
                            }
                            
                            if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                                if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                    $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                    var symbolnew = $(object).find("#" + dimension.symbolName)
                                    symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + (marginX-symbolnew.get(0).getBBox().width) + "," + newY + ")");
                                    marginX += 8;
                                } else {
                                    $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                                }
                            }
                            if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                
                                temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + newY + ")");
                                marginX += temp.get(0).getBBox().width + margin;
                            }
                            
                        } else {
                            if ($("." + dimension.field).find('path').attr('d')) {
                                if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                                    
                                    var symbolnew = $(temp.parents()[0]).find("#" + dimension.symbolName)
                                    symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + newY + ")");
                                    marginX += 20 ;
                                }
                            }
                            if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + newY + ")");
                                marginX += temp.get(0).getBBox().width + margin;
                            }
                            
                        }
                    } else {
                        
                        
                        if (i === 0) {
                            
                            if (template.LH_dimension.art != "" && template.LH_dimension.art != undefined) {
                                var aaaa = $(object).find('svg #art')?$(object).find('svg #art').remove():null;
                                var newg = document.createElementNS("http://www.w3.org/2000/svg", "g");
                                newg.setAttribute("id","art")
                                newg.setAttribute("width","100%");
                                newg.setAttribute("height","100%");
                                newg.innerHTML = template.LH_dimension.art
                                $(object).find('svg')[0].appendChild(newg);
                                
                                
                            }
                            if (dimension.yType == 'down') {
                                
                                type.forEach((chunk, i) => {
                                    var temp = $(object).find("." + chunk);
                                    if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                        totalheightOfAllChunk += temp.get(0).getBBox().y + temp.get(0).getBBox().height + margin;
                                    }
                                    marginY = (parseInt(template.cardHeight) - parseInt(totalheightOfAllChunk) - LH.svgSafeArea - 10);
                                });
                                
                                
                                if (dimension.follow != "" && dimension.follow != undefined) {
                                    var prevEle = $(object).find("." + dimension.follow)
                                    marginY = prevEle.height + prevEle.y;
                                } 
                                if (dimension.follow != "" && dimension.follow != undefined) {
                                    var prevEle = $(object).find("." + dimension.follow)
                                    var regex = /\.*translate\((.*),(.*)\)/i;
                                    var tranfroms = prevEle.attr('transform');
                                    var res = tranfroms.match(regex);
                                    marginY = prevEle.get(0).getBBox().width + parseInt(res[1]) + margin;
                                    // prevEle.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                                    marginY = prevEle.get(0).getBBox().y
                                    
                                }
                                if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                                    if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                        $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                        var symbolnew = $(object).find("#" + dimension.symbolName)
                                        symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + marginY + ")");
                                        marginX += 8;
                                    } else {
                                        $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                                    }
                                }
                                if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                    newX = marginX;
                                    temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + marginY + ")");
                                    marginY += temp.get(0).getBBox().height + margin;
                                }
                            } else {
                                if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                                    if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                        $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                        var symbolnew = $(object).find("#" + dimension.symbolName)
                                        symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + marginY + ")");
                                        marginX += 8;
                                    } else {
                                        $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                                    }
                                }
                                if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                    temp.attr('transform', "scale(1) translate(" + marginX + "," + marginY + ")");
                                    marginY += temp.get(0).getBBox().height + margin;
                                    
                                    if (dimension.follow != "" && dimension.follow != undefined) {
                                        var prevEle = $(object).find("." + dimension.follow)
                                        var regex = /\.*translate\((.*),(.*)\)/i;
                                        var tranfroms = prevEle.attr('transform');
                                        var res = tranfroms.match(regex);
                                        marginX = prevEle.get(0).getBBox().width + parseInt(res[1]) + margin;
                                        // prevEle.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                                        newY = prevEle.get(0).getBBox().y
                                        
                                    }
                                    if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                                        if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                            $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                            var symbolnew = $(object).find("#" + dimension.symbolName)
                                            symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + marginY + ")");
                                            marginX += 8;
                                        } else {
                                            $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                                        }
                                    }
                                }
                                if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                    newX = x;
                                    temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + marginY + ")");
                                    marginY += temp.get(0).getBBox().height + margin;
                                }
                            }
                            
                            
                            
                        } else {
                            if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                                temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + marginY + ")");
                                marginY += temp.get(0).getBBox().height + margin;
                            }
                            
                        }
                    }
                    
                    if (dimension.rotate) {
                        rotate = dimension.rotate;
                        $(temp).find('path').attr('transform', " rotate(" + rotate + ")");
                    }
                    
                    
                    
                }
                else if (template.viewType === 'right') {
                    
                    if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
                        dimension = template.LH_dimension[item];
                    } else {
                        dimension = template.generate.templatePath[item];
                    }
                    var y = template.LH_dimension[item].y;
                    var x = 0;
                    var temp = $(object).find("." + item);
                    var bbox = temp.get(0).getBBox();
                    
                    if ($("." + dimension.field).find('path').attr('d')) {
                        if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                            var symbolnew = $(object).find("#" + dimension.symbolName)
                            symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                            marginX += 20;
                        }
                    }
                    
                    if (i === 0) {
                        if (template.LH_dimension.art != "" && template.LH_dimension.art != undefined) {
                            var aaaa = $(object).find('svg #art')?$(object).find('svg #art').remove():null;
                            var newg = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            newg.setAttribute("id","art")
                            newg.setAttribute("width","100%");
                            newg.setAttribute("height","100%");
                            newg.innerHTML = template.LH_dimension.art
                            $(object).find('svg')[0].appendChild(newg);
                            
                            
                        }
                        if (dimension.xType == 'left') {
                            marginX = ((template.cardWidth * dimension.widthStart / 100) / dimension.scale * 100 - bbox.x * dimension.scale) + marginX;
                        } else if (dimension.xType == 'center') {
                            marginX = bbox.x + ((template.cardWidth * 0.5) - (bbox.width * 0.5));
                        } else if (dimension.xType == 'right') {
                            marginX = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / dimension.scale - lastPointX) - 30;
                            
                        }
                        
                        if (dimension.yType == 'down') {
                            newY = template.cardHeight - lastPointY - LH.svgSafeArea;
                        } else if (dimension.yType == 'up') {
                            newY = LH.svgSafeArea;
                        } else if (dimension.yType == 'center') {
                            newY = (template.cardHeight * 0.5) - (lastPointY * 0.5) + LH.svgSafeArea;
                        }
                        else {
                            newY = dimension.y
                        }
                        if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                            if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                var symbolnew = $(object).find("#" + dimension.symbolName)
                                symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + (marginX) + "," + newY + ")");
                                marginX += (8+symbolnew.get(0).getBBox().width);
                            } else {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                            }
                        }
                        
                        
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + newY + ")");
                            marginX += temp.get(0).getBBox().width + margin;
                        }
                        
                    } else {
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + newY + ")");
                            marginX += temp.get(0).getBBox().width + margin;
                        }
                    }
                    
                    
                    
                }
                else if (template.viewType === 'divided') {
                    
                    if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
                        dimension = template.LH_dimension[item];
                        
                    } else {
                        dimension = template.generate.templatePath[item];
                    }
                    
                    var temp = $(object).find("." + item);
                    bbox = temp.get(0).getBBox();
                    
                    if (i === 0) {
                        if (template.LH_dimension.art != "" && template.LH_dimension.art != undefined) {
                            var aaaa = $(object).find('svg #art')?$(object).find('svg #art').remove():null;
                            var newg = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            newg.setAttribute("id","art")
                            newg.setAttribute("width","100%");
                            newg.setAttribute("height","100%");
                            newg.innerHTML = template.LH_dimension.art
                            $(object).find('svg')[0].appendChild(newg);
                            
                            
                        }
                        if (dimension.xType == 'left') {
                            newX = ((template.cardWidth * dimension.widthStart / 100) / dimension.scale * 100 - bbox.x * dimension.scale) + LH.svgSafeArea;
                        } else if (dimension.xType == 'center') {
                            newX = ((template.cardWidth * dimension.widthPercent / 100) + (template.cardWidth * dimension.widthStart / 100)) / (2 * dimension.scale) - ((bbox.width) / 2) - bbox.x;
                        } else if (dimension.xType == 'right') {
                            newX = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / dimension.scale - bbox.width - bbox.x) - 70;
                        }
                        if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                            if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d)
                                var symbolnew = $(object).find("#" + dimension.symbolName)
                                symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                                newX += 8;
                            } else {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                            }
                        }
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            newY = y;
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                            newX += temp.get(0).getBBox().width + margin;
                        }
                    } else {
                        if (dimension.symbolName != "" && dimension.symbolName != undefined) {
                            if ($(object).find("." + dimension.field).html() != "" && $(object).find("." + dimension.field).html() != "<path d=\"\"></path>") {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", dimension.d);
                                var symbolnew = $(object).find("#" + dimension.symbolName)
                                symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                                newX += 8;
                            } else {
                                $(object).find("#" + dimension.symbolName).find('path').attr("d", "")
                            }
                        }
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + newY + ")");
                            newX += temp.get(0).getBBox().width + margin;
                        }
                    }
                    
                    
                }
                else {
                    if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
                        dimension = template.LH_dimension[item];
                    } else {
                        dimension = template.generate.templatePath[item];
                    }
                    
                    var y = template.LH_dimension[item].y;
                    var x = 0;
                    if ($("." + dimension.field).find('path').attr('d')) {
                        if (dimension.symbol != "" && dimension.symbol != undefined) {
                            var symbolnew = $(object).find("#" + dimension.symbolName)
                            symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                            marginX += 20;
                        }
                    }
                    
                    var temp = $(object).find("." + item);
                    bbox = temp.get(0).getBBox();
                    if (i === 0) {
                        if (template.LH_dimension.art != "" && template.LH_dimension.art != undefined) {
                            var aaaa = $(object).find('svg #art')?$(object).find('svg #art').remove():null;
                            var newg = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            newg.setAttribute("id","art")
                            newg.setAttribute("width","100%");
                            newg.setAttribute("height","100%");
                            newg.innerHTML = template.LH_dimension.art
                            $(object).find('svg')[0].appendChild(newg);
                            
                            
                        }
                        if (dimension.xType == 'left') {
                            newX = ((template.cardWidth * dimension.widthStart / 100) / dimension.scale * 100 - bbox.x * dimension.scale) + LH.svgSafeArea;
                        } else if (dimension.xType == 'center') {
                            newX = ((template.cardWidth * dimension.widthPercent / 100) + (template.cardWidth * dimension.widthStart / 100)) / (2 * dimension.scale) - ((bbox.width) / 2) - bbox.x;
                        } else if (dimension.xType == 'right') {
                            newX = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / dimension.scale - bbox.width - bbox.x) - 70;
                        }
                        if ($("." + dimension.field).find('path').attr('d')) {
                            if (dimension.symbol != "") {
                                
                                var symbolnew = $(temp.parents()[0]).find("#" + dimension.symbolName)
                                symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + (dimension.y) + ")");
                                newX += 20;
                            }
                        }
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + (dimension.y) + ")");
                            newX += temp.get(0).getBBox().width + margin;
                            newY = y;
                        }
                    } else {
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            temp.attr('transform', "scale(" + dimension.scale + ") translate(" + newX + "," + (dimension.y) + ")");
                            newX += temp.get(0).getBBox().width + margin;
                        }
                    }
                }
            });
        } else {
            
            if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
                dimension = template.LH_dimension[type];
                
            } else {
                dimension = template.generate.templatePath[type];
            }
            var bbox = object.get(0).getBBox();
            var x = 0;
            var y = template.LH_dimension[type].y;
            var oscale = dimension.scale;
            if (dimension.follow != "" && dimension.follow != undefined) {
                
                if (dimension.rotate) {
                    rotate = dimension.rotate;
                    $(object).find('path').attr('transform', " rotate(" + rotate + ")");
                }
                var prevEle = $(object).find("." + dimension.follow);
                var regex = /\.*translate\((.*),(.*)\)/i;
                var temp = prevEle.attr('transform');
                var res = temp.match(regex);
                x = prevEle.get(0).getBBox().width + parseInt(res[1]) + margin;
                y = parseInt(res[2]);
            } else {
                if (dimension.yType == 'down') {
                    
                    allPartOfAddress.forEach((chunk, i) => {
                        var temp = $(parentDiv).find("." + chunk);
                        if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                            lastPointX += temp.get(0).getBBox().x + temp.get(0).getBBox().height + margin;
                        }
                        newY = (parseInt(template.cardHeight) - parseInt(lastPointX) - LH.svgSafeArea - 20)
                    });
                    
                    
                    if ($("." + dimension.field).find('path').attr('d')) {
                        if (dimension.symbol != undefined && dimension.symbol != "") {
                            
                            var symbolnew = $(temp.parents()[0]).find("#" + dimension.symbolName)
                            
                            symbolnew.attr('transform', "scale(1) translate(" + newX + "," + newY + ")");
                            newX += 20;
                        }
                    }
                    if($(temp).html()!="" && $(temp).html()!="<path d=\"\"></path>"){
                        temp.attr('transform', "scale(1) translate(" + newX + "," + newY + ")");
                        newY += temp.get(0).getBBox().height + margin;
                    }
                } else {
                    
                    if (dimension.rotate) {
                        rotate = dimension.rotate;
                        $(object).find('path').attr('transform', " rotate(" + rotate + ")");
                    }
                    if ($("." + dimension.field).find('path').attr('d')) {
                        if (dimension.symbol != "" && dimension.symbol != undefined) {
                            var symbolnew = $(object).find("#" + dimension.symbolName)
                            symbolnew.attr('transform', "scale(" + dimension.scale + ") translate(" + marginX + "," + (y) + ")");
                            marginX += 20;
                            newY = y;
                        }
                    }
                    
                    if (dimension.xType == 'left') {
                        x = ((template.cardWidth * dimension.widthStart / 100) / oscale * 100 - bbox.x * oscale) + marginX;
                    } else if (dimension.xType == 'center') {
                        x = bbox.x + ((template.cardWidth * 0.5) - (bbox.width * 0.5));
                    } else if (dimension.xType == 'right') {
                        x = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / oscale - bbox.width - bbox.x) - 30;
                    }
                    
                    if (dimension.yType == 'up') {
                        y = (((template.cardHeight * dimension.heightStart / 100)) / oscale - bbox.y) + 100 + LH.svgSafeArea;
                    } else if (dimension.yType == 'center') {
                        y = (template.cardHeight * dimension.heightStart / 100 + template.cardHeight * dimension.heightPercent / 100) / (2 * oscale) - bbox.height / 2 - bbox.y;
                    } else if (dimension.yType == 'down') {
                        y = ((template.cardHeight * dimension.heightStart / 100) + (template.cardHeight * dimension.heightPercent / 100)) / oscale - (bbox.height) - bbox.y;
                    }
                }
            }
            
            object.attr('transform', "scale(" + dimension.scale + ") translate(" + x + "," + (y) + ")");
        }
        
        
    },
    
    
    scaleToFit :function(object, template, margins) {
        var logo_cont_obj = object.get(0);
        var cur_scale = parseFloat(getScale(logo_cont_obj));
        
        var scale_flag = true;
        
        logo_cont_bbox = logo_cont_obj.getBBox();
        var upd_width = logo_cont_bbox.width * cur_scale;
        var upd_heigth = logo_cont_bbox.height * cur_scale;
        while (((upd_width + margins) >= template.cardWidth) || ((upd_heigth + margins) >= template.cardHeight)) {
            upd_width = logo_cont_bbox.width * cur_scale;
            upd_heigth = logo_cont_bbox.height * cur_scale;
            cur_scale = cur_scale - 0.01;
            setScale(logo_cont_obj, cur_scale);
            updateCurrentLogoSize(logo_cont_obj, cur_scale, "down", template);
        }
        
        
        
    },
    
    updateGroup:function(object, template, type, size) {
        
        var dimension;
        var scale = 1;
        
        if (object.selector.split(" ")[1].indexOf("LHSVG") > -1) {
            dimension = template.LH_dimension[type];
            
        } else {
            dimension = template.generate.templatePath[type];
        }
        
        
        if (type == "frame" && template.isFrame == 0) {
            object.attr('transform', "scale(0) translate(0,0)");
            return { 'x': 0, 'y': 0, 'scale': 0 };
        }
        
        var bbox = object.get(0).getBBox();
        var x = 0;
        var y = 0;
        
        var ox = dimension.x;
        var oy = dimension.y;
        var oscale = dimension.scale;
        
        var obj = {};
        scale = scale + (size / 100);
        
        
        if (dimension.xType == 'left') {
            x = ((template.cardWidth * dimension.widthStart / 100) / scale - bbox.x * scale)+svgSafeArea;
        }
        if (dimension.xType == 'center') {
            x = ((template.cardWidth * dimension.widthPercent / 100) + (template.cardWidth * dimension.widthStart / 100)) / (2 * scale) - ((bbox.width) / 2) - bbox.x;
        }
        if (dimension.xType == 'right') {
            x = ((template.cardWidth * dimension.widthStart / 100) + (template.cardWidth * dimension.widthPercent / 100) / scale - bbox.width - bbox.x)-svgSafeArea;
        }
        
        if (dimension.yType == 'up') {
            y = ((template.cardHeight * dimension.heightStart / 100)) / scale - bbox.y;
        }
        if (dimension.yType == 'center') {
            y = (template.cardHeight * dimension.heightStart / 100 + template.cardHeight * dimension.heightPercent / 100) / (2 * scale) - bbox.height / 2 - bbox.y;
        }
        if (dimension.yType == 'down') {
            y = ((template.cardHeight * dimension.heightStart / 100) + (template.cardHeight * dimension.heightPercent / 100)) / scale - (bbox.height) - bbox.y;
        }
        //	}
        if (x < constantVars.MINX || x > constantVars.MAXX) {
            
            obj = { 'x': ox, 'y': oy, 'scale': oscale };
        }
        object.attr('transform', "scale(" + scale + ") translate(" + x + "," + y + ")");
        obj = { 'x': x, 'y': y, 'scale': scale };
        
        return obj;
    },
    setScale:function(obj, newScale) {
        var curTrans = obj.getAttribute('transform');
        var newScaleString = 'scale(' + newScale + ')';
        var regex = /scale\([0-9|\.]*\)/i;
        var newTrans = curTrans.replace(regex, newScaleString);
        obj.setAttribute('transform', newTrans);
    },
    
    updateCurrentLogoSize:function(object, scale, scaletype, template) {
        
        var bbox = object.getBBox();
        var x = bbox.x;
        var y = bbox.y;
        if (scaletype == "up") {
            scale = scale + (scale / 100);
        }
        
        else if (scaletype == "down") {
            scale = scale - (scale / 100);
        }
        else {
            scale = scale;
        }
        
        
        x = ((template.cardWidth * 100 / 100) + (template.cardWidth * 0 / 100)) / (2 * scale) - ((bbox.width) / 2) - bbox.x;
        
        y = ((template.cardHeight * 100 / 100) + (template.cardHeight * 0 / 100)) / (2 * scale) - ((bbox.height) / 2) - bbox.y;
        
        $(object).attr('transform', "scale(" + scale + ") translate(" + x + "," + y + ")");
        
        
    },
    
    
    
    
    
    getScale:function(obj) {
        var regex = /scale\(([0-9|\.]*)\)/i;
        var transform_attr = obj.getAttribute('transform');
        var res = transform_attr.match(regex);
        if (typeof res[1] != 'undefined' || !isNaN(res[1])) {
            return res[1];
        } else {
            return false;
        }
    }
    
    
}
$(()=>{
    LH.init(1456);
})


