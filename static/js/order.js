function deleteImage( $item ) {
    $item.fadeOut(function() {
            var $list = $( "ul", $order ).length ?
            $( "ul", $order ) :
            $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $order );

            $item.find( "a.ui-icon-trash" ).remove();
            $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
                $item
                .animate({ width: "48px" })
                .find( "img" )
                .animate({ height: "36px" });
                });
            });
}

$(function() {
        //on window scroll fire it will call a function.

        $(window).scroll(function () {

            //after window scroll fire it will add define pixel added to that element.
            set = $(document).scrollTop() + "px";

            //this is the jQuery animate function to fixed the div position after scrolling.

            $('.sticky').animate({ top: set }, { duration: 100, queue: false });

            });

        $(".toggleBtn").click(function () {
            $(".toggleDiv").toggle("slide", { direction: "right"}, 300);
            if ($(this).html() == "left") {
            $(this).html("right"); //change text of button
            }
            else {
            $(this).html("left"); //change text of button
            }
            });
        // there's the gallery and the trash
        var $gallery = $( "#gallery" ),
            $order = $( "#order" );

        // let the gallery items be draggable
        $( "li", $gallery ).draggable({
cancel: "a.ui-icon", // clicking an icon won't initiate dragging
revert: "invalid", // when not dropped, the item will revert back to its initial position
containment: "document",
helper: "clone",
cursor: "move"
});

// let the order be droppable, accepting the gallery items
$order.droppable({
accept: "#gallery > li",
activeClass: "ui-state-highlight",
drop: function( event, ui ) {
deleteImage( ui.draggable );
}
});

// let the gallery be droppable as well, accepting items from the order
$gallery.droppable({
accept: "#order li",
activeClass: "custom-state-active",
drop: function( event, ui ) {
recycleImage( ui.draggable );
}
});

// image deletion function
var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";


// image recycle function
var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
function recycleImage( $item ) {
    $item.fadeOut(function() {
            $item
            .find( "a.ui-icon-refresh" )
            .remove()
            .end()
            .css( "width", "96px")
            .append( trash_icon )
            .find( "img" )
            .css( "height", "72px" )
            .end()
            .appendTo( $gallery )
            .fadeIn();
            });
}

// image preview function, demonstrating the ui.dialog used as a modal window
function viewLargerImage( $link ) {
    var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );

    if ( $modal.length ) {
        $modal.dialog( "open" );
    } else {
        var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
            .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
                img.dialog({
title: title,
width: 400,
modal: true
});
                }, 1 );
}
}

// resolve the icons behavior with event delegation
$( "ul.gallery > li" ).click(function( event ) {
        var $item = $( this ),
        $target = $( event.target );

        if ( $target.is( "a.ui-icon-trash" ) ) {
        deleteImage( $item );
        } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
        viewLargerImage( $target );
        } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
        }

        return false;
        });
});
