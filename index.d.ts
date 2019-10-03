type replacer = (index: number, value: any) => any;

interface verifierOptions {
    replacer: replacer | null | undefined;
    indentation: number | undefined;
}

interface objectVerifier {
    compare: (actual:any, expected:any) => boolean;
    getComparisonOutput: (actual:any, expected:any) => string;
    verify: (actual:any, expected:any) => undefined;
}

interface objectVerifierBuilder {
    buildVerifier: (verifierOptions: verifierOptions) => objectVerifier
}