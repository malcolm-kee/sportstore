import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Counter] reset'),
      mapTo({
        type: 'Nothing',
      })
    )
  );

  constructor(private actions$: Actions) {}
}
