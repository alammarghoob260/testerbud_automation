import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { ExplorePage } from '../../src/pages/UIElementAutomation/explorePage.js';
import { BasicElementsPage } from '../../src/pages/UIElementAutomation/BasicElementsPage.js';
import { InteractiveElementsPage } from '../../src/pages/UIElementAutomation/InteractiveElementsPage.js';
import { uiPlaygroundData } from '../../src/utils/testData.js';

test.describe('UI Playground - Explore + Basic + Interactive Elements', () => {
  test.beforeEach(async ({ practiceSitePage }) => {
    const { selectPracticeSite } = practiceSitePage;
    await selectPracticeSite(6); // ✅ UI Playground
  });

  test('verify page heading and interact with all elements', async ({ practiceSitePage }) => {
    const { page } = practiceSitePage;
    const explore = new ExplorePage(page);
    const basic = new BasicElementsPage(page);
    const interactive = new InteractiveElementsPage(page);

    // --- Explore Page ---
    expect(await explore.verifyPageLoaded()).toBeTruthy();
    await explore.scrollDown(500);

    // --- Basic Elements ---
    expect(await basic.checkBasicElementsVisible()).toBeTruthy();

    await basic.textField.fill(uiPlaygroundData.textFieldValue);
    await expect(basic.textFieldOutput).toContainText(uiPlaygroundData.textFieldValue);

    await basic.textArea.fill(uiPlaygroundData.textAreaValue);
    await expect(basic.textAreaOutput).toContainText(uiPlaygroundData.textAreaValue);

    await basic.clickMeButton.click();
    await expect(basic.clickMeOutput).toContainText(uiPlaygroundData.buttonOutput);

    await basic.singleCheckbox.check();
    await expect(basic.singleCheckboxOutput).toContainText(uiPlaygroundData.singleCheckboxOutput);

    await basic.checkboxOption1.check();
    await basic.checkboxOption3.check();
    await expect(basic.multipleCheckboxOutput).toContainText(
      uiPlaygroundData.multipleCheckboxOutput
    );

    await basic.radio2.check();
    await expect(basic.radioOutput).toContainText(uiPlaygroundData.radioSelection);

    await basic.singleDropdown.selectOption(uiPlaygroundData.singleDropdownSelection);
    await expect(basic.singleDropdownOutput).toContainText(
      uiPlaygroundData.singleDropdownSelection
    );

    await basic.multiDropdown.selectOption(uiPlaygroundData.multiDropdownSelection);
    await expect(basic.multiDropdownOutput).toContainText(uiPlaygroundData.multiDropdownOutput);

    // --- Interactive Elements ---
    await interactive.clickLink();
    await expect(interactive.linkOutput).toContainText(uiPlaygroundData.linkOutput);

    await interactive.clickImage();
    await expect(interactive.imageOutput).toContainText(uiPlaygroundData.imageOutput);

    await interactive.sortTableBy('Name');
    await expect(interactive.tableOutput).toContainText(uiPlaygroundData.tableOutput);

    await interactive.hoverTooltip();
    await expect(interactive.tooltipOutput).toContainText(uiPlaygroundData.tooltipOutput);

    await interactive.setSlider(uiPlaygroundData.sliderValue);
    await expect(interactive.sliderOutput).toContainText(uiPlaygroundData.sliderOutput);

    await interactive.incrementProgress();
    await expect(interactive.progressOutput).toContainText(uiPlaygroundData.progressOutput);
  });
});
