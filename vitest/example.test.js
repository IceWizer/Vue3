import { expect, test } from 'vitest'
import utils from '@/auth/utils';

test('adds 1 + 2 to equal 3', () => {
    expect(utils.useJwt.isJwtExpired(null)).toBe(true)
})