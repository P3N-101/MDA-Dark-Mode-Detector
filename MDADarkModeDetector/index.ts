import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class MDADarkModeDetector implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private isDarkMode: boolean;
    private notifyOutputChanged: () => void;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.isDarkMode = this.detectDarkMode(context);
        //console.log("Init: isDarkMode =", this.isDarkMode, "fluentDesignLanguage =", context.fluentDesignLanguage);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const newIsDarkMode = this.detectDarkMode(context);
        console.log("UpdateView: newIsDarkMode =", newIsDarkMode, "fluentDesignLanguage =", context.fluentDesignLanguage);
        if (newIsDarkMode !== this.isDarkMode) {
            this.isDarkMode = newIsDarkMode;
            this.notifyOutputChanged();
        }
        this.notifyOutputChanged();
    }

    private detectDarkMode(context: ComponentFramework.Context<IInputs>): boolean {
        // Try fluentDesignLanguage first
        if (context.fluentDesignLanguage?.isDarkTheme !== undefined) {
           // console.log("DetectDarkMode: Using fluentDesignLanguage.isDarkTheme =", context.fluentDesignLanguage.isDarkTheme);
            return context.fluentDesignLanguage.isDarkTheme;
        }

        // Fallback: Check background color of the navbar container
        const targetElement = document.querySelector("#id-30[data-id='navbar-container']");
        if (targetElement) {
            const computedStyle = getComputedStyle(targetElement);
            const backgroundColor = computedStyle.backgroundColor;
           // console.log("DetectDarkMode: backgroundColor =", backgroundColor);

            // Check for Dark Mode (rgb(10,10,10)) or Light Mode (rgb(240,240,240))
            if (backgroundColor === "rgb(10, 10, 10)") {
                return true;
            } else if (backgroundColor === "rgb(240, 240, 240)") {
                return false;
            }
        } else {
           // console.log("DetectDarkMode: Target element (#id-30) not found");
        }

        // Default to false if no reliable detection
        //console.log("DetectDarkMode: Defaulting to false");
        return false;
    }

    public getOutputs(): IOutputs {
        //console.log("getOutputs: isDarkMode =", this.isDarkMode);
        return {
            isDarkMode: this.isDarkMode.toString()
        };
    }

    public destroy(): void {
        // No cleanup needed since there's no UI
    }
}