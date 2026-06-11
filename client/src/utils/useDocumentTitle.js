import { useEffect } from "react";

const SITE_NAME = "Drops of Change Welfare Society";

/**
 * Sets the document title for a page.
 * @param {string} title - Page-specific title (e.g. "About Us")
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);
}
