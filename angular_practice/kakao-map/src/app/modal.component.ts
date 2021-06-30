import { BsModalRef } from 'ngx-bootstrap/modal';

export abstract class AbstractModalComponent
{
	private isOnProcessing: boolean;

	get IsOnProcessing(): boolean
	{
		return this.isOnProcessing;
	}

	protected constructor(
		public ModalRef: BsModalRef
	)
	{
		this.isOnProcessing = false;
	}

	abstract HideInternal(): Promise<void> | void;

	async Hide(): Promise<void>
	{
		await this.HideInternal();

		await this.ModalRef.hide();
	}

	TryLockProcess(): boolean
	{
		if (this.isOnProcessing)
			return false;

		this.isOnProcessing = true;
		return true;
	}

	TryUnlockProcess(): void
	{
		if (this.isOnProcessing === false)
			return;

		setTimeout(async () =>
		{
			this.isOnProcessing = false;
		}, 1000);
	}
}
