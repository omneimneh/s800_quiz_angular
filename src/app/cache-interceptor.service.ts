import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

// In-memory cache interceptor, enough to use for our simple case (no more than a dozen of users)
@Injectable()
export class CacheInterceptorService implements HttpInterceptor {

  constructor() {
  }

  private cache = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);
    if (cachedResponse) {
      console.debug("retrieving response from cache for request", req.urlWithParams, cachedResponse);
      // Serve from cache
      return of(cachedResponse);
    }

    console.debug("calling server", req.urlWithParams);

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Cache the new response
          this.cache.set(req.urlWithParams, event);
        }
      })
    );
  }
}
