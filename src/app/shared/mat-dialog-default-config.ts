import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig(): MatDialogConfig {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = false;
  dialogConfig.maxWidth = '800px';

  return dialogConfig;
}
