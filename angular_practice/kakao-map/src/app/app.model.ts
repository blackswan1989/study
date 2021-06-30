import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export class AppModel
{

  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
	)
	{

	}
}
