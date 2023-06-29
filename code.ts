// 選択している要素を取得
const selections: ReadonlyArray<SceneNode> = figma.currentPage.selection;

if (selections.length > 0) {
  // 選択中の要素があれば、選択した要素内の全てのインスタンスを切り離す
  detachAllInstances(selections);
  // インスタンスを切り離せたら、ユーザーに完了を通知
  figma.notify("Completed to detach instances.");
} else {
  // 選択中の要素が無ければ、Figmaの下部にメッセージを表示
  figma.notify("Select any object");
}
// プラグインを終了
figma.closePlugin();

/**
 * 選択した要素内の全てのインスタンスを切り離します。
 * 引数の要素の子孫の要素も探索し、子孫の要素にインスタンスがあれば全て切り離します。
 * @param nodes インスタンスの切り離しを行う対象
 */
function detachAllInstances(nodes: ReadonlyArray<SceneNode>) {
  // 各要素を処理する
  for (let i = 0; i < nodes.length; i++) {
    const node: SceneNode = nodes[i];
    // 要素がインスタンスであれば、インスタンスを切り離す
    if (node.type === "INSTANCE") {
      let frame: FrameNode = node.detachInstance();
      // インスタンスを切り離した後のフレーム内のインスタンスを探し、切り離す
      detachAllInstances(frame.children);
      // 子要素を持つタイプであれば、子要素に対して処理を繰り返す
    }else if ("children" in node) {
      detachAllInstances(node.children);
    }
  }
}
