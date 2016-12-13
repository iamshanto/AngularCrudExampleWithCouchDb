import {Routes, RouterModule} from "@angular/router";
import {CustomersComponent} from "./customers/customers.component";
import {CustomerCreateComponent} from "./customers/customer-create/customer-create.component";
import {CustomerViewComponent} from "./customers/customer-view/customer-view.component";

const APP_ROUTE_MAP:Routes = [
    {path: '', component: CustomersComponent},
    {path: 'customer/create', component: CustomerCreateComponent},
    {path: 'customer/view/:id', component: CustomerViewComponent}
];

export const AppRoutes = RouterModule.forRoot(APP_ROUTE_MAP);