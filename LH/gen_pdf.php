<?php
$post_svg = json_decode($_POST['svg_data'],true);  
$full_path = "pdf";
$total = count($post_svg["LHSVGBG"])+count($post_svg["LHSVG"]);
$totalPdfGenerated =0;
$zip = new ZipArchive;
$listfiles=[];
if(!empty($post_svg)){
    /* for($j=0;$j<count($post_svg["front"]);$j++){
        $fp = fopen("temp_front_".$j.".svg", 'w');
        fwrite($fp, $post_svg["front"][$j]);
        //exec("/usr/bin/rsvg-convert -f pdf -o ".$full_path."/Front_".$j.".pdf temp_front_".$j.".svg 2>&1 &",$arr);
        
        exec("/usr/bin/inkscape -f temp_front_".$j.".svg -A ".$full_path."/Front_".$j.".pdf 2>&1 ",$arr);
        array_push($listfiles,$full_path."/Front_".$j.".pdf");
        if(!empty($arr)){
            echo json_encode([status=>false,err=>'Error in file genration']);
        }
        else{
            $totalPdfGenerated++;
        }
    } */
    for($j=0;$j<count($post_svg["LHSVG"]);$j++){
        
        $fp = fopen("LHSVG_".$j.".svg", 'w');        
        fwrite($fp, $post_svg["LHSVG"][$j]); 
        //exec("/usr/bin/rsvg-convert -f pdf -o ".$full_path."/Back_".$j.".pdf LHSVG_".$j.".svg 2>&1 &",$arr);
        exec("/usr/bin/inkscape -f LHSVG_".$j.".svg -A ".$full_path."/LHSVG_".$j.".pdf 2>&1 ",$arr);
        array_push($listfiles,$full_path."/LHSVG_".$j.".pdf");
        if(!empty($arr)){
            echo json_encode([status=>false,err=>'Error in file genration']);
        }
        else{
            $totalPdfGenerated++;
        } 
    }           
    for($j=0;$j<count($post_svg["LHSVGBG"]);$j++){
        
        $fp = fopen("LHSVGBG_".$j.".svg", 'w');        
        fwrite($fp, $post_svg["LHSVGBG"][$j]); 
        //exec("/usr/bin/rsvg-convert -f pdf -o ".$full_path."/Back_".$j.".pdf LHSVG_".$j.".svg 2>&1 &",$arr);
        exec("/usr/bin/inkscape -f LHSVGBG_".$j.".svg -A ".$full_path."/LHSVG_BG_".$j.".pdf 2>&1 ",$arr);
        array_push($listfiles,$full_path."/LHSVG_BG_".$j.".pdf");
        if(!empty($arr)){
            echo json_encode([status=>false,err=>'Error in file genration']);
        }
        else{
            $totalPdfGenerated++;
        } 
    }           
    if($totalPdfGenerated==$total){
        //echo json_encode([status=>true,filepath=>$full_path]);
        $files = array($listfiles);
        
        $zipname = 'BusinessCards.zip';
        $zip = new ZipArchive;
        
        if($zip->open($zipname, ZipArchive::CREATE)){
            foreach ($listfiles as $file) {
                $zip->addFile($file,basename($file));
            }
            $zip->close();
            header('Content-type: application/zip');
            header('Content-Disposition: attachment; filename="'.basename($zipname).'"');
            header("Content-length: " . filesize($zipname));
            header("Pragma: no-cache");
            header("Expires: 0");     
            flush();
            readfile($zipname);
        } else {
            echo 'Failed!';
        };        
    }
}
?>