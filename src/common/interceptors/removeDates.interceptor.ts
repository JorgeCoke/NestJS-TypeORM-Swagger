import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Interceptor()
export class RemoveDates implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map((data) => {
        if (Array.isArray(data)){
            return data.map(element => {
                return this.clean(element);
            })
        } else {
            return this.clean(data);
        }
    });
  }

  clean (object){
    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }

}