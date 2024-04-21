/**
 * 選択した要素内の全てのインスタンスを切り離します。
 * 引数の要素の子孫の要素も探索し、子孫の要素にインスタンスがあれば全て切り離します。
 * @param nodes インスタンスの切り離しを行う対象
 */
export const detachAllInstances =  (nodes: ReadonlyArray<SceneNode>) => {
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