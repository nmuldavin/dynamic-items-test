import { init, UiAppEventType, ModalSize } from "@datadog/ui-apps-sdk";
import { useEffect } from 'react';

const client = init({ debug: true });

const initController = () => {
  // listen for cog menu click events
  client.events.on(UiAppEventType.DASHBOARD_COG_MENU_CLICK, context => {
    if (context.menuItem.key === 'open-confirmation') {
      // Open a modal pre-defined in the app manifest, referenced by string key
      client.modal.open('confirmation-modal');
    }

    // open an iframe modal defined inline here in controller
    if (context.menuItem.key === 'open-custom-modal') {
      client.modal.open({
        key: 'custom-modal',
        size: ModalSize.LARGE,
        isCloseable: true,
        source: 'modal'
      })
    }
  })

  // listen for modal events
  client.events.on(UiAppEventType.MODAL_ACTION, () => {
    console.log('Confirmed!')
  })

  client.events.on(UiAppEventType.MODAL_CANCEL, () => {
    console.log('Denied!')
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
