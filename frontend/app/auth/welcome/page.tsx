import { LogOut } from 'lucide-react';

interface WelcomeScreenProps {
  username: string;
  onLogout: () => void;
}

export function WelcomeScreen({ username, onLogout }: WelcomeScreenProps) {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
      <h2 className="mb-4">Chào mừng trở lại!</h2>
      <p className="text-gray-600 mb-6">
        Xin chào, <span className="font-semibold text-blue-600">{username}</span>
      </p>
      <p className="text-gray-500 text-sm mb-6">
        Bạn đã đăng nhập thành công vào hệ thống.
      </p>
      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2 w-full  bg-red-600  rounded-lg hover:bg-red-700 transition-colors"
      >
        <LogOut size={20} />
        Đăng Xuất
      </button>
    </div>
  );
}
