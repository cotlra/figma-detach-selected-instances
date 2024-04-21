import { detachAllInstances } from "./detach-all-instances";

// 選択している要素を取得
const selections: ReadonlyArray<SceneNode> = figma.currentPage.selection;

if (selections.length > 0) {
  // 選択中の要素があれば、選択した要素内の全てのインスタンスを切り離す
  detachAllInstances(selections);
  // インスタンスを切り離せたら、ユーザーに完了を通知
  figma.notify("Completed to detach instances.");
} else {
  // 選択中の要素が無ければ、Figmaの下部にメッセージを表示
  figma.notify("Select any object.");
}
// プラグインを終了
figma.closePlugin();


