// src/refs.ts

import { useRef, MutableRefObject } from 'react';

export const useSearchUserRef = (): MutableRefObject<HTMLInputElement | null> => {
	return useRef<HTMLInputElement>(null);
};