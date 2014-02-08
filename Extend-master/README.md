Extend by Adi Chikara
=====================

Extend is a framitecture (Part framework & Part architecture). Design is used as a identity for a product, extend gives you the power to decide what you want for your product. You can combine components from different libraries that you like or create your own components where you feel the need. 

This also tries to tackle the problem of not being the lowest common denominator. You don't have to be pulled down by the library you use. If your application is wireframing tool aimed for designers and you know your user base is on Macs with latest browsers why be stuck with a bootstrap grid system? This gives you the power to decide what you should support rather than the library or framework.  

### Architecture
    Base | Theme
         |
         --- Modules
                |
                --- Components
                        |
                        --- Layouts
                               |
                               --- Views

#### Base
This is the core foundation of your application. 

Example of Base
* Normalize
* Typography
* Grid System

#### Theme
Theme contains the top most coat of design for your application. 

Example of Theme
* Colors

#### Modules
These are re-usable elements at there most basic atomic unit but sufficiently complete to be used independently, with other modules or with components.

Example of Modules
* Buttons 
* Input Elements
* Icons
* Image

#### Components
Componets are modular re-usable parts of our design. They are made by using one or more modules together. Componets can often extend themselves.

    Component X
        |
        --- X.1
        --- x.2
        --- x.3

Example of Components

    Nav
     |
     --- Menu
     --- Pagination
     
    Popup
     |
     --- tooltip
     --- popover
     --- growl-notifications
     
Forms

#### Layouts
Layouts are sections of your page with hold components together.

Example of Layouts
* Header
* Filters
* Masthead

#### Views
Views are the end pages of your application. These are the final wrappers of everything. A page inside a application can contain one or more views.

### Variables
Each part is like a class, thus variable definition is important and to be defined separately but within the scope of the part. Structurally this could at the top of the file or in a separate file within the folder of that part.
You could define a function as a constructor with default variable which can be modified when the constructor is called.

### States
It is import to follow common semantics for states as this would be a interface for your javascript to interact with the code. Once you are free to modify the semantics as comfortable with the team but it needs to be defined and followed across.

Example of states
* Hidden
* Expanded
* Active

### Icons
Icons can be used as fonts. But it is suggested that they are used as ligatures.
icomatic.io is tool that allows you to import your SVG icons to create web-fonts and create/modify the ligatures for them as per your semantics.

### Ecosystem
The higher you are in the chain, more likely you are to find the required parts. Normalize for base for instance is a separate project used by many mainstream front-end libraries. On the other-hand your views would be something that you will most likely create yourself.

### References and good reads
* [Atomic Design System](http://pattern-lab.info/)
* [Responsive Deliverables](http://daverupert.com/2013/04/responsive-deliverables/)
* [Responsive Resources](http://bradfrost.github.io/this-is-responsive/resources.html)
* [BEM Methodology](http://bem.info/method/)
* [Smacss](http://smacss.com/)
