/* ------------------------------------------------------------------------------------------------------------------------------
Helpers import
--------------------------------------------------------------------------------------------------------------------------------*/
import { BaseHelpers } from "./helpers/base-helpers";
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();


/* ------------------------------------------------------------------------------------------------------------------------------
Modules import
--------------------------------------------------------------------------------------------------------------------------------*/
import { initDesktopMenu } from "./modules/initDesktopMenu";
import { initOffcanvasMenu } from "./modules/initOffcanvasMenu";
import { initSearchForm } from "./modules/initSearchForm";

initDesktopMenu();
initOffcanvasMenu();
initSearchForm();
