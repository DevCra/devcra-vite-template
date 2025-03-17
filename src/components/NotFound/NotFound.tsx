import { useRouter } from "@/hooks/common";

function NotFound() {
  const router = useRouter();

  return (
    <main>
      <h1>404 Not Found</h1>
      <p>페이지를 찾을 수 없습니다</p>
      <button type="button" onClick={() => router.push("/")}>
        홈 화면으로 이동
      </button>
    </main>
  );
}

export default NotFound;
