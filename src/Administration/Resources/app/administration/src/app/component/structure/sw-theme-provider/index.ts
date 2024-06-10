import template from "./sw-theme-provider.html.twig";
import "./sw-theme-provider.css";
import { computed } from "vue";

const { Component } = Shopware;

type ThemeAttributeValue = "light" | "dark";
type ThemePreference = "light" | "dark" | "system";

Component.register("sw-theme-provider", {
    template,

    provide() {
        return {
            themePreference: computed(() => this.preference),
            setThemePreference: (value: ThemePreference) => {
                this.preference = value;
            },
        };
    },

    data(): {
        preference: ThemePreference;
        theme: ThemeAttributeValue | undefined;
    } {
        return {
            preference: "system",
            theme: undefined,
        };
    },

    watch: {
        preference: {
            immediate: true,
            handler(value: ThemePreference) {
                localStorage.setItem("meteor-theme", value);

                if (value === "system") {
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? (this.theme = "dark")
                        : (this.theme = "light");

                    window
                        .matchMedia("(prefers-color-scheme: dark)")
                        .addEventListener("change", (event) => {
                            event.matches
                                ? (this.theme = "dark")
                                : (this.theme = "light");
                        });

                    return;
                }

                this.theme = value;
            },
        },

        theme: {
            immediate: true,
            handler(value) {
                document.documentElement.setAttribute("data-theme", value);
            },
        },
    },

    mounted() {
        const storedPreference = localStorage.getItem("meteor-theme");
        if (!storedPreference) return;

        // TODO: validate instead of blindly casting
        this.preference = storedPreference as ThemePreference;
    },
});
