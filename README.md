# zapworksStudio_tutorials

Here are some guidelines designed to make it easier to build Zapworks Studio projects which are error resistant, validated at design time, reusable and is easy to understand by others.

Endeavour to split development time like this:
Structural design time > Implementation time > Bug fixing time

General:

Prefer using controllers, states and timelines over script for setting node properties:

States and timelines are previewable in Studio without having to publish your experience
Controllers ensure that properties always have a single, defined, value by guaranteeing that exactly one element is active at all times

Studio validates all state and timeline values at design time to reduce the chances of errors at runtime
Where your experience has multiple UI modes use controllers to implement a state machine. States can be used to display/hide the appropriate UI elements for each mode. Use state’s active and notactive event handlers to execute any code that pertains to a given mode.

The UI changes remain previewable in Studio
The event handlers guarantee that notactive is called for the previous state before active is called on the next
A separate script node for each state helps to improve maintainability and modularity
Prefer using relativeTo and relativeToProp over changing the parent group of a node from script:

Both relativeTo and relativeToProp can be changed using states and timelines
Avoiding hierarchy changes at runtime makes it easier to reason about the state of the hierarchy at any given point in time
Scripting

Prefer smaller self-contained script nodes over larger monolithic scripts:

Script nodes with a single well-specified purpose are easier to reuse or remove
Think tapas not spaghetti
Use let instead of var for declaring variables:

The block scope of variables declared with let avoids common mistakes that prevail when using changing function-scoped variables that are referenced from closures
The semantics of variables declared with let better matches similar constructs in other languages
Use interfaces to add type safety to data you process:

Compile-time error checking will identify code that interacts with data in a way that contradicts your interface
You must still check untrusted data for conformance to your interfaces
Rarely use the any type:

The any type undermines type-safety and thus the guarantees it provides
The any type is appropriate for external data prior to validation
The any type must not be used as a substitute for proper type-safe code design
Only cast (e.g. using <>) if doing so is required by an API design that you do not control:

Casting undermines type-safety and thus the guarantees it provides
TypeScript’s ‘is a’ construct allows for type-safe downcasting
The ‘is a’ construct may be used to cast from any with extreme care
Avoid building classes, unless you expect other classes to inherit from them:

Script nodes provide the modularity and encapsulation of classes, while simplifying the lifecycle
Prefer subsymbols where multiple instances of a concept are required since they also encapsulate other Studio concepts (e.g. controllers and media files) and are well supported in Studio’s user interface
Communicate between script nodes using exported functions:

The exported functions in a script define a type-safe interface that helps to ensure correct usage from elsewhere in your project, meanwhile they abstract away the details of the implementation
Exported functions in subsymbols can be accessed from parent symbols, and so facilitate cross-symbol communication
Prevent misuse of your APIs by designing them to make it impossible
Prefer exported functions over tag calls for cross-symbol or project communication:

Tag calls undermine type-safety and thus the guarantees it provides
Tag calls add weakly specified dependencies between scripts that are difficult to track or validate
Your tag calls may collide with those in a symbol elsewhere in your project

**One exception of this is when you want to cleanly communicate upwards in the hierarchy from a lot of nested symbols (from sub symbols to the main symbol).

Sound effects are a good example. Each button sub symbol can have a tag call to something that responds by playing a sound effect. That way you only need 1 instance of a sound effect at the root and don’t have to worry about the chain of symbol.emits.
