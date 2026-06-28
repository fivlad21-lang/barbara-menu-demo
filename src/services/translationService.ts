/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "../types";
import { uiTranslations, UITranslations } from "../translations/ui";

class TranslationService {
  /**
   * Retrieves the UI strings for a given language code.
   */
  public getTranslations(lang: LanguageCode): UITranslations {
    return uiTranslations[lang] || uiTranslations.bg;
  }
}

export const translationService = new TranslationService();
