/**
 * AI Prompts & Flows Module Entry Point
 * Exports all system prompts, conversation flows, predefined replies, and language utilities.
 */

const { 
  detectLanguage, 
  isCodeSwitched, 
  RESPONSE_STYLE_GUIDELINES 
} = require('./language_rules');

const { 
  MASTER_SYSTEM_PROMPTS, 
  INTENT_SYSTEM_PROMPTS 
} = require('./system_prompts');

const { 
  PREDEFINED_REPLIES, 
  interpolate, 
  getPredefinedReply 
} = require('./predefined_replies');

const { 
  CONVERSATION_STATES 
} = require('./conversation_flows');

module.exports = {
  // Language detection & rules
  detectLanguage,
  isCodeSwitched,
  RESPONSE_STYLE_GUIDELINES,

  // System prompts (Persona, Contextual)
  MASTER_SYSTEM_PROMPTS,
  INTENT_SYSTEM_PROMPTS,

  // Predefined replies (Bilingual)
  PREDEFINED_REPLIES,
  interpolate,
  getPredefinedReply,

  // State-machine flows & templates
  CONVERSATION_STATES
};
