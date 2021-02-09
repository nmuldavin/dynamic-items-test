import { init, UiAppEventType, MenuItemType } from "@datadog/ui-apps-sdk";
import { useEffect } from 'react';

const client = init({ debug: true });

const initController = () => {
  client.dashboardCogMenu.onRequest(({ dashboard }) => {

    return { items: dashboard.timeframe.isLive ? [
      {
        key: 'confirm-cog-menu',
        label: 'Click this if you see me!',
        type: MenuItemType.EVENT
      }
    ] : [] };
  });

  client.widgetContextMenu.onRequest(({ widget }) => {
    return {
      items: [
        {
          key: 'confirm-context-menu',
          label: `Click if this is a ${widget.definition.type}!`,
          type: MenuItemType.EVENT
        }
      ]
    }
  })

  client.events.on(UiAppEventType.DASHBOARD_COG_MENU_CLICK, context => {
    if (context.menuItem.key === 'confirm-cog-menu') {
      client.modal.open({
        key: 'confirm-cog-menu',
        title: 'Did you see it only on live dashboards?',
        message: 'Try toggling clicking the pause button to turn of live timeframe tracking. The cog menu item should only be present when live tracking.',
        actionLabel: 'Yes, it works',
        cancelLabel: 'No, you screwed up'
      })
    }
  })

  client.events.on(UiAppEventType.WIDGET_CONTEXT_MENU_CLICK, context => {
    if (context.menuItem.key === 'confirm-context-menu') {
      client.modal.open({
        key: 'confirm-context-menu',
        title: 'Did you see a menu item listing the widget type?',
        message: 'If so, that item was populated dynamically by the main Iframe controller, dynamic menu items work',
        actionLabel: 'Yes, I saw it',
        cancelLabel: 'No, I did not'
      })
    }
  })

  // listen for modal events
  client.events.on(UiAppEventType.MODAL_ACTION, () => {
    console.log('Approved!')
  })

  client.events.on(UiAppEventType.MODAL_CANCEL, () => {
    console.log('Rejected!')
  })

  client.events.on(UiAppEventType.MODAL_CLOSE, (definition) => {
    console.log(`User exited modal ${definition.key}`);
  })

  // listen for a custom event sent from modal IFrame
  client.events.onCustom('modal_button_click', (count: number) => {
    console.log(`The user has clicked the button ${count} times`)
  })
}

// controller IFrame is hidden, empty react component
function Controller() {
  useEffect(initController, []);

  return null
}

export default Controller;
