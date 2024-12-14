import "./App.css";
import Tiptap from "@/components/tiptap/Tiptap";
import { CommandDialogDemo } from "./components/command/command";

function App() {
	return (
		<div>
			<CommandDialogDemo />
			<div className="h-screen w-full flex flex-col ">
				<div className="h-7 flex-0 px-2"></div>
				<div className="overflow-hidden h-full">
					<Tiptap />
				</div>
			</div>
		</div>
	);
}

export default App;
