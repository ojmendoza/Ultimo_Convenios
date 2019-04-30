From 62a186094f60a4a8a7ac210cbab36f855b8c639e Mon Sep 17 00:00:00 2001
From: Daniel Ruf <daniel.ruf@ueberbit.de>
Date: Thu, 14 Mar 2019 08:37:32 +0100
Subject: [PATCH] Fix race condition of focus events in Chrome 73+, closes
 #1138

---
 lib/picker.js | 138 +++++++++++++++++++++++++-------------------------
 1 file changed, 69 insertions(+), 69 deletions(-)

diff --git a/lib/picker.js b/lib/picker.js
index 0edf7396..54b7d089 100644
--- a/lib/picker.js
+++ b/lib/picker.js
@@ -261,75 +261,6 @@ function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {
 
                     // Pass focus to the root element’s jQuery object.
                     focusPickerOnceOpened()
-
-                    // Bind the document events.
-                    $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {
-
-                        var target = getRealEventTarget( event, ELEMENT )
-
-                        // If the target of the event is not the element, close the picker picker.
-                        // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
-                        //   Also, for Firefox, a click on an `option` element bubbles up directly
-                        //   to the doc. So make sure the target wasn't the doc.
-                        // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
-                        //   which causes the picker to unexpectedly close when right-clicking it. So make
-                        //   sure the event wasn’t a right-click.
-                        // * In Chrome 62 and up, password autofill causes a simulated focusin event which
-                        //   closes the picker.
-                        if ( ! event.isSimulated && target != ELEMENT && target != document && event.which != 3 ) {
-
-                            // If the target was the holder that covers the screen,
-                            // keep the element focused to maintain tabindex.
-                            P.close( target === P.$holder[0] )
-                        }
-
-                    }).on( 'keydown.' + STATE.id, function( event ) {
-
-                        var
-                            // Get the keycode.
-                            keycode = event.keyCode,
-
-                            // Translate that to a selection change.
-                            keycodeToMove = P.component.key[ keycode ],
-
-                            // Grab the target.
-                            target = getRealEventTarget( event, ELEMENT )
-
-
-                        // On escape, close the picker and give focus.
-                        if ( keycode == 27 ) {
-                            P.close( true )
-                        }
-
-
-                        // Check if there is a key movement or “enter” keypress on the element.
-                        else if ( target == P.$holder[0] && ( keycodeToMove || keycode == 13 ) ) {
-
-                            // Prevent the default action to stop page movement.
-                            event.preventDefault()
-
-                            // Trigger the key movement action.
-                            if ( keycodeToMove ) {
-                                PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
-                            }
-
-                            // On “enter”, if the highlighted item isn’t disabled, set the value and close.
-                            else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
-                                P.set( 'select', P.component.item.highlight )
-                                if ( SETTINGS.closeOnSelect ) {
-                                    P.close( true )
-                                }
-                            }
-                        }
-
-
-                        // If the target is within the root and “enter” is pressed,
-                        // prevent the default action and trigger a click on the target instead.
-                        else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
-                            event.preventDefault()
-                            target.click()
-                        }
-                    })
                 }
 
                 // Trigger the queued “open” events.
@@ -823,6 +754,75 @@ function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {
                 P.$holder.eq(0).focus()
             }, 0)
         }
+
+        // Bind the document events.
+        $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {
+
+            var target = getRealEventTarget( event, ELEMENT )
+
+            // If the target of the event is not the element, close the picker picker.
+            // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
+            //   Also, for Firefox, a click on an `option` element bubbles up directly
+            //   to the doc. So make sure the target wasn't the doc.
+            // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
+            //   which causes the picker to unexpectedly close when right-clicking it. So make
+            //   sure the event wasn’t a right-click.
+            // * In Chrome 62 and up, password autofill causes a simulated focusin event which
+            //   closes the picker.
+            if ( ! event.isSimulated && target != ELEMENT && target != document && event.which != 3 ) {
+
+                // If the target was the holder that covers the screen,
+                // keep the element focused to maintain tabindex.
+                P.close( target === P.$holder[0] )
+            }
+
+        }).on( 'keydown.' + STATE.id, function( event ) {
+
+            var
+                // Get the keycode.
+                keycode = event.keyCode,
+
+                // Translate that to a selection change.
+                keycodeToMove = P.component.key[ keycode ],
+
+                // Grab the target.
+                target = getRealEventTarget( event, ELEMENT )
+
+
+            // On escape, close the picker and give focus.
+            if ( keycode == 27 ) {
+                P.close( true )
+            }
+
+
+            // Check if there is a key movement or “enter” keypress on the element.
+            else if ( target == P.$holder[0] && ( keycodeToMove || keycode == 13 ) ) {
+
+                // Prevent the default action to stop page movement.
+                event.preventDefault()
+
+                // Trigger the key movement action.
+                if ( keycodeToMove ) {
+                    PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
+                }
+
+                // On “enter”, if the highlighted item isn’t disabled, set the value and close.
+                else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
+                    P.set( 'select', P.component.item.highlight )
+                    if ( SETTINGS.closeOnSelect ) {
+                        P.close( true )
+                    }
+                }
+            }
+
+
+            // If the target is within the root and “enter” is pressed,
+            // prevent the default action and trigger a click on the target instead.
+            else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
+                event.preventDefault()
+                target.click()
+            }
+        })
     }
 
 
