module.exports = {
    roots: ['<rootDir>/src'],

    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],

    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },

    testEnvironment: 'jsdom',

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/fileMock.js'
    }
};
