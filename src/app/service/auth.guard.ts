import { CurrentUserService } from './current-user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private currUserService: CurrentUserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    console.log(route.data);
    console.log('canActivate on ' + state.url);
    if (!this.currUserService.islogin) {
      console.log('[AuthGuard] You are not allowed to view this page.'+state.url );
      //this.router.navigate(['sign-in'], { queryParams: { retUrl: state.url } });
      return false;
    }
    return this.checkAllowRole(route.data['userRoles']);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot ):boolean {
    return true;
  }

  private checkAllowRole(ExpectedRole:any[]):boolean{
    const currentUserRole = this.currUserService.roles;
    console.log("checkAllowRole() current user rules is ",currentUserRole);
    let result = ExpectedRole.some(r=> currentUserRole.includes(r))
    console.log('checkAllowRole()=',result);
    return result
  }

}//class
