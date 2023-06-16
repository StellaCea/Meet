import puppeteer from "puppeteer"

describe("show/hide an event details", () => {
    let browser, page;
    jest.setTimeout(30000);
    
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".event");
    });

    afterAll(() => {
        browser.close();
    });
    //Scenario1
    test("an event element  is collapsed by default", async () => {
        const eventDetails = await page.$(".event .event__Details");
        expect(eventDetails).toBeNull();
    });

    //Scenario 2
    test("User can expand an event to see its details", async () => {
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .event__Details");
        expect(eventDetails).toBeDefined();
    });

    //Scenario 3
    test("user can collapse an event to hide its details", async () => {
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .event__Details");
        expect(eventDetails).toBeNull();
    })

});
