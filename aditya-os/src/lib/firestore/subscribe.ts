import {
  onSnapshot,
  type Query,
  type DocumentData,
  type FirestoreError,
} from "firebase/firestore";

export type SubscribeOptions = {
  onError?: (error: FirestoreError) => void;
  onReady?: () => void;
};

export type SubscribeOptionsCode = {
  onError?: (code: string) => void;
  onReady?: () => void;
};

export function mapSubscribeOptions(
  options?: SubscribeOptionsCode
): SubscribeOptions | undefined {
  if (!options) return undefined;
  return {
    onReady: options.onReady,
    onError: options.onError
      ? (err) => options.onError!(err.code)
      : undefined,
  };
}

export function subscribeQuery<T>(
  q: Query<DocumentData>,
  onData: (items: T[]) => void,
  options?: SubscribeOptions
) {
  let first = true;
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as T[];
      onData(items);
      if (first) {
        first = false;
        options?.onReady?.();
      }
    },
    (error) => {
      console.error("[Firestore]", error.code, error.message);
      options?.onError?.(error);
      if (first) {
        first = false;
        options?.onReady?.();
      }
    }
  );
}
