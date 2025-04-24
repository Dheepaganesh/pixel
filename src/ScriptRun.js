import React, { useEffect } from "react";
import { isCognito } from "./usePrivateMode";

const ScriptRun = () => {
  const loadScript = async (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);

    return new Promise((resolve) => {
      script.onload = () => resolve(true);
      script.onerror = (error) => console.error("Script loading error", error);
    });
  };
  useEffect(() => {
    (async function () {
      try {
        isCognito().then((result) => {});
        const getCookie = function (name) {
          return (
            (document.cookie.match(new RegExp("(^|;)s*" + name + "=([^;]*)")) ||
              [])[2] || ""
          );
        };
        const hasConsent = () => getCookie("cookie_concent").includes("yes");
        const defaultParams = {
          requestPageUrl: encodeURIComponent(window.location.href),
          cookieConsent: hasConsent(),
        };
        const customParams = {
          domain: "67ee2df871b1d47f90f5210d",
          ownerType: "marketing_page",
          type: "self",
          cookieConsent: true,
        };
        const query = new URLSearchParams({
          ...defaultParams,
          ...customParams,
        });
        console.debug(
          "Query Params Object:",
          JSON.stringify(Object.fromEntries(query.entries()))
        );
        console.debug("Query String:", query);
        const apiUrl = "https://proapi.qa.experience.com/api/pixel/v1/domain/pixel";
        const fullUrl = apiUrl + "?" + query;
        const response = await fetch(fullUrl);
        const data = await response.json();
        console.debug(data);
        if (data && data.url) {
          if (window.ExpDataCollector) {
            delete window.ExpDataCollector;
          }
          loadScript(
            "https://pixels.devtest.experience.com/dheep-local-v-1.2.0/localtest_2/67f3c0af71b1d47f90f52711/p/a85023dc-bcdc-4132-86e3-1686abf1ed83/67f3c0af71b1d47f90f52714.js?requestPageUrl=https%3A%2F%2Fwww.experience.com%2Freviews%2Foffice%2Fcorp-referral-180964&cookieConsent=false&type=self&ownerType=marketing_page&domain=67f3c0af71b1d47f90f52711&isVVPixelSkiped=false&isPrimaryPixelLoaded=true"
          );
          console.log("Flow Test 1");
        }
      } catch (error) {
        console.error("❌ Error fetching pixel script:", error);
      }
    })();
  }, []);
  return (
    <div>
      <h1 class="xyz">Dynamic Script Loader Example</h1>
    </div>
  );
};

export default ScriptRun;
