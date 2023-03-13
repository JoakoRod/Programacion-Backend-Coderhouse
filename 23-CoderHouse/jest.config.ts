import type { Config } from 'jest';
// Sync object
export default async (): Promise<Config> => {
    return {
        verbose: true,
    };
};