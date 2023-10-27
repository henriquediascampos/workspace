import { KeyboardEvent, Menu, Point, Rectangle, Tray, app } from 'electron';
import path from 'path';

app.whenReady().then(async () => {
    await import('./assets/icon.png');
    const iconPath = path.resolve(__dirname, 'assets', 'icon.png');
    console.log('path da imagem', iconPath, __dirname);

    const tray = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Novo', type: 'normal' },
        { label: 'Editar', type: 'normal' },
        { type: 'separator' },
        { label: 'Item3', type: 'normal' },
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Workspace');
    tray.setTitle('Titulo');
    tray.addListener('click', (event: KeyboardEvent, bounds: Rectangle, position: Point) => {
        console.log('cliquei');
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
