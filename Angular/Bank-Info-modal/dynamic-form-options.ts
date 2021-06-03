import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { NgOption } from '@ng-select/ng-select';
import { IDatePickerOption } from '@core/directives/date-picker/date-picker.interface';
import * as DTO from '@dto/backend';
import { FilterAdminStatus } from '@core/configs/shared.types';
import { TreeItem, ISelectorOptions } from '@core/directives/multi-selector';

export interface IDynamicFormRule
{
	[key: string]: string | RegExp;
}

export const DynamicFormRules: IDynamicFormRule = {
	Number: '[0-9]+',
	Amount: '^(0|([1-9]?\\d{1,2}(,\\d{3})+)|([1-9][0-9]*))((\\.)(\\d{1,2}))?$',
	IPAddress: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
	PhoneFormat: '^[0-9-+\(\)\s]{1,20}',
	URL: new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$%&'\(\)\*\+\{\},;=.]+$/, 'i'),
	Alphabet: '[a-zA-Z]+',
	Alphanum: '[0-9a-zA-Z]+',
	AlphanumComma: '[0-9a-zA-Z,]+',
	AlphaUmlaute: '[a-zA-ZäöüßÄÖÜ]+',
	AlphaSpace: '[a-zA-Z\\s]+',
	AlphanumSpecial: /^[0-9a-zA-Z\s!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`{\|}~]+$/,
	NoLeadZero: '^[1-9]{1}[0-9]*$',
	AlphaSpaceHyphen: '[a-zA-Z\\-\\s]+',
	RealName: '[a-zA-Z\\-\\s\\u0027\\u2019\\u02bc]+',
	AlphanumFullStopUnderscore: '[0-9a-zA-Z\\._]+',
	NumberNoZero: '^[1-9][0-9]*$',
};

export const DynamicFormDefaultClass = {
	Horizon: {
		Label: 'col-md-4',
		Control: 'col-md-8',
		FormLabel: 'col-form-label col-md-4',
		FullLabel: 'col-12',
		FullControl: 'col-12',
	}
};

export enum DynamicFormValidStatus
{
	Empty,
	Valid,
	Invalid,
}

export enum DynamicFormGroupTypes
{
	Normal,
	Horizon,
	Search
}

export enum DynamicFormControlTypes
{
	Static,
	Textbox,
	Textarea,
	Dropdown,
	Date,
	DateTime,
	Radio,
	Checkbox,
	Switch,
	Hidden,
	AgentFilter,
	PlayerPersonalFilter,
	AffiliatePlayerPersonalFilter,
	PlayerTag,
	FishBuffetRanks,
	ActivityAdvancedFilter,
	AccountStatus,
	SelfExclusion,
	AdminSite,
	AdminCountry,
}

export enum DynamicFormInputTypes
{
	text = 'text',
	hidden = 'hidden',
	password = 'password',
	checkbox = 'checkbox',
	radio = 'radio',
	number = 'number',
	email = 'email',
	tel = 'tel',
}

export interface IDynamicFormOptions
{
	Key?: string;
	Type?: DynamicFormInputTypes;
	Label?: string;
	LabelClass?: string;
	MaxLength?: number;
	MinNumber?: number;
	MaxNumber?: number;
	Placeholder?: string;
	ControlType?: DynamicFormControlTypes;
	ControlClass?: string;
	CustomClass?: string;
	Validators?: Array<ValidatorFn>;
	ErrorMessage?: string;
	IsEnabled?: boolean;
	IsShow?: boolean;
	IsCredit?: boolean;
	UseOnlyControl?: boolean;

	Rows?: number;
	SelectItems?: Array<NgOption>;
	SelectMultiple?: boolean;
	SelectSearchable?: boolean;
	ClearButton?: boolean;
	StartDateKey?: string;
	EndDateKey?: string;
	DateOptions?: IDatePickerOption;
	MinLevel?: number;
	MaxLevel?: number;
	MultiSelectItems?: TreeItem[];
	MultiSelectOptions?: ISelectorOptions;
	IsLabelUpperCase?: boolean;
}

export class DynamicFormBase
{
	Key: string;
	Type?: DynamicFormInputTypes;
	Label?: string;
	LabelClass?: string;
	MaxLength?: number;
	MinNumber?: number;
	MaxNumber?: number;
	Placeholder?: string;
	ControlType?: DynamicFormControlTypes;
	ControlClass?: string;
	CustomClass?: string;
	Validators?: Array<ValidatorFn>;
	ErrorMessage?: string;
	IsEnabled?: boolean;
	IsShow?: boolean;
	IsCredit?: boolean;
	UseOnlyControl?: boolean;

	Rows?: number;
	SelectItems?: Array<NgOption>;
	SelectMultiple?: boolean;
	SelectSearchable?: boolean;
	ClearButton?: boolean;
	StartDateKey?: string;
	EndDateKey?: string;
	DateOptions?: IDatePickerOption;
	MinLevel?: number;
	MaxLevel?: number;
	MultiSelectItems?: TreeItem[];
	MultiSelectOptions?: ISelectorOptions;
	IsLabelUpperCase?: boolean;

	constructor(
		options?: IDynamicFormOptions,
	)
	{
		this.Type = (options && options.Type) ? options.Type : DynamicFormInputTypes.text;
		this.Key = (options && options.Key) ? options.Key : '';
		this.Label = (options && options.Label) ? options.Label : null;
		this.LabelClass = (options && options.LabelClass) ? options.LabelClass : '';
		this.MaxLength = (options && typeof options.MaxLength === 'number') ? options.MaxLength : null;
		this.MinNumber = (options && typeof options.MinNumber === 'number') ? options.MinNumber : null;
		this.MaxNumber = (options && typeof options.MaxNumber === 'number') ? options.MaxNumber : null;
		this.Placeholder = (options && options.Placeholder) ? options.Placeholder : this.Label;
		this.ControlType = (options && options.ControlType) ? options.ControlType : DynamicFormControlTypes.Static;
		this.ControlClass = (options && options.ControlClass) ? options.ControlClass : '';
		this.CustomClass = (options && options.CustomClass) ? options.CustomClass : '';
		this.Validators = (options && options.Validators) ? options.Validators : [];
		this.ErrorMessage = (options && options.ErrorMessage) ? options.ErrorMessage : '';
		this.IsEnabled = (options && typeof options.IsEnabled === 'boolean') ? options.IsEnabled : true;
		this.IsShow = (options && typeof options.IsShow === 'boolean') ? options.IsShow : true;
		this.UseOnlyControl = (options && typeof options.UseOnlyControl === 'boolean') ? options.UseOnlyControl : false;

		this.SelectItems = (options && options.SelectItems) ? options.SelectItems : [];
		this.SelectMultiple = (options && typeof options.SelectMultiple === 'boolean') ? options.SelectMultiple : false;
		this.SelectSearchable = (options && typeof options.SelectSearchable === 'boolean') ? options.SelectSearchable : true;
		this.ClearButton = (options && typeof options.ClearButton === 'boolean') ? options.ClearButton : true;
		this.StartDateKey = (options && options.StartDateKey) ? options.StartDateKey : '';
		this.EndDateKey = (options && options.EndDateKey) ? options.EndDateKey : '';
		this.DateOptions = (options && options.DateOptions) ? options.DateOptions : {};
		this.Rows = (options && typeof options.Rows === 'number') ? options.Rows : null;
		this.MinLevel = (options && typeof options.MinLevel === 'number') ? options.MinLevel : null;
		this.MaxLevel = (options && typeof options.MaxLevel === 'number') ? options.MaxLevel : null;
		this.MultiSelectItems = (options && options.MultiSelectItems) ? options.MultiSelectItems : [];
		this.MultiSelectOptions = (options && options.MultiSelectOptions) ? options.MultiSelectOptions : {};
		this.IsLabelUpperCase = (options && typeof options.IsLabelUpperCase === 'boolean') ? options.IsLabelUpperCase : false;
	}
}

export class DynamicFormOption
{
	Form: FormGroup;
	Items: Array<DynamicFormBase | null>;
	GroupType?: DynamicFormGroupTypes;

	constructor(items: Array<DynamicFormBase>, groupType?: DynamicFormGroupTypes, validators?: Array<ValidatorFn>)
	{
		this.Items = [];
		this.GroupType = groupType;

		this.Form = new FormGroup({}, validators);

		if (items && items.length > 0)
		{
			items.forEach((item: DynamicFormBase) =>
			{
				this.Add(item);
			});
		}
	}

	Add(item: DynamicFormBase | null): void
	{
		this.Items.push(item);

		if (item)
		{
			this.Form.addControl(item.Key, new FormControl(null, (item.Validators ? item.Validators : [])));
		}
	}

	Remove(key: string | number, isRemoveItem: boolean): number | null
	{
		try
		{
			if (typeof key !== 'string' && typeof key !== 'number')
				throw 'invalid type';

			let idx: number;
			let oldItem: DynamicFormBase | null;

			if (typeof key === 'string')
			{
				idx = this.Items.findIndex((e: DynamicFormBase) => (e && e.Key === key));
				
				if (idx > -1)
					oldItem = this.Items[idx];
			}
			else
			{
				idx = key;
				oldItem = this.Items[idx];
			}

			if (isRemoveItem)
				this.Items.splice(idx, 1);
			else
				this.Items[idx] = null;


			if (oldItem)
			{
				this.Form.get(oldItem.Key).reset();
				this.Form.removeControl(oldItem.Key);
			}

			return idx;
		}
		catch (err)
		{
			console.log(err);
			return null;
		}
	}

	RemoveAll(): void
	{
		this.Form.reset();

		this.Items.forEach((e: DynamicFormBase | null) =>
		{
			if (e)
				this.Form.removeControl(e.Key);
		});

		this.Items = [];
	}

	Change(key: string | number, item: DynamicFormBase): void
	{
		if (typeof key !== 'string' && typeof key !== 'number')
			return;

		try
		{
			const idx: number | null = this.Remove(key, false);

			if (typeof idx === 'number')
			{
				this.Items[idx] = item;
				this.Form.addControl(item.Key, new FormControl(null, (item.Validators ? item.Validators : [])));
			}
		}
		catch (err)
		{
			console.log(err);
		}
	}
}

export function CloneDynamicForm(sourceForm: DynamicFormBase, key?: string, label?: string)
{
	const clonedForm: DynamicFormBase = { ...{}, ...sourceForm };

	if (key)
	{
		clonedForm.Key = key;
	}

	if (label)
	{
		clonedForm.Label = label;
	}

	return clonedForm;
}

export class DynamicFormStatic extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Static;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);
	}
}

export class DynamicFormTextbox extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Textbox;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.Type = (options && options.Type) ? options.Type :DynamicFormInputTypes.text;
	}
}

export class DynamicFormHidden extends DynamicFormTextbox
{
	ControlType = DynamicFormControlTypes.Hidden;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.Type = (options && options.Type) ? options.Type :DynamicFormInputTypes.hidden;
	}
}

export class DynamicFormPassword extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Textbox;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.Type = (options && options.Type) ? options.Type :DynamicFormInputTypes.password;
	}
}

export class DynamicFormCheckbox extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Checkbox;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.Type = (options && options.Type) ? options.Type :DynamicFormInputTypes.checkbox;
	}
}

export class DynamicFormRadio extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Radio;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.Type = (options && options.Type) ? options.Type :DynamicFormInputTypes.radio;
	}
}

export class DynamicFormDropdown extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Dropdown;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.SelectItems = (options && options.SelectItems) ? options.SelectItems : [];
		this.SelectMultiple = (options && typeof options.SelectMultiple === 'boolean') ? options.SelectMultiple : false;
		this.SelectSearchable = (options && typeof options.SelectSearchable === 'boolean') ? options.SelectSearchable : true;
		this.ClearButton = (options && typeof options.ClearButton === 'boolean') ? options.ClearButton : true;
	}
}

export class DynamicFormTextarea extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Textarea;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);
	}
}

export class DynamicFormDate extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.Date;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);

		this.Type = (options && options.Type) ? options.Type : DynamicFormInputTypes.text;
		this.StartDateKey = (options && options.StartDateKey) ? options.StartDateKey : 'DateBegin';
		this.EndDateKey = (options && options.EndDateKey) ? options.EndDateKey : 'DateEnd';

		if (options && options.DateOptions)
			this.DateOptions = options.DateOptions;
	}
}

export class DynamicFormAgentFilter extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.AgentFilter;
	MinLevel?: number;
	MaxLevel?: number;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);
	}
}

export class DynamicFormPlayerPersonalFilter extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.PlayerPersonalFilter;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);
	}
}

export class DynamicFormAffiliatePlayerPersonalFilter extends DynamicFormBase
{
	ControlType = DynamicFormControlTypes.AffiliatePlayerPersonalFilter;

	constructor(options?: IDynamicFormOptions)
	{
		super(options);
	}
}

// ...

export const BankAccountNumber = new DynamicFormTextbox({
	Key: 'BankAccount',
	Label: 'PLAYER_DETAIL_SECURITY_BANKINFO_MODAL_ACCOUNTNUMBER',
	Validators: [
		Validators.required,
		Validators.pattern(DynamicFormRules.Number),
		Validators.maxLength(10),
		Validators.minLength(10)
	],
	LabelClass: DynamicFormDefaultClass.Horizon.Label,
	ControlClass: DynamicFormDefaultClass.Horizon.Control,
	ErrorMessage: 'PLAYER_DETAIL_SECURITY_BANKINFO_MODAL_ERROR_INVALIDACCOUNTNUMBER',
	Type: DynamicFormInputTypes.number,
});

// ...