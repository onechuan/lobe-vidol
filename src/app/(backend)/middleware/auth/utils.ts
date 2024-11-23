import { getAppConfig } from '@/config/app';
import { AgentRuntimeError } from '@/libs/agent-runtime';
import { ChatErrorType } from '@/types/fetch';

interface CheckAuthParams {
  accessCode?: string;
  apiKey?: string;
}
/**
 * Check if the provided access code is valid, a user API key should be used or the OAuth 2 header is provided.
 *
 * @param {string} accessCode - The access code to check.
 * @param {string} apiKey - The user API key.
 * @param {boolean} oauthAuthorized - Whether the OAuth 2 header is provided.
 * @throws {AgentRuntimeError} If the access code is invalid and no user API key is provided.
 */
export const checkAuthMethod = ({ apiKey, accessCode }: CheckAuthParams) => {
  // if apiKey exist
  if (apiKey) return;

  const { ACCESS_CODES } = getAppConfig();

  // if accessCode doesn't exist
  if (!ACCESS_CODES.length) return;

  if (!accessCode || !ACCESS_CODES.includes(accessCode)) {
    console.warn('tracked an invalid access code, 检查到输入的错误密码：', accessCode);
    throw AgentRuntimeError.createError(ChatErrorType.InvalidAccessCode);
  }
};