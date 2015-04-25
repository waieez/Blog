// sets a given stream as an exclusive dependancy
// sets a stream's siblings as children of itself
// exclusive child also intercepts and adopts incoming children (handled by set_dependant)
pub fn set_as_exclusive (&mut self, child_id: u32, parent_id: u32) {
    // re-maps all children and sets flag on exclusive parent
    let mut orphans = None;
    match self.streams.get_mut(&parent_id) {
        None => (),
        Some(parent) => {
            // sets flag and gets all siblings
            parent.is_exclusive = true;
            parent.exclusive_child = child_id;
            parent.remove_child(&child_id);
            let mut siblings = parent.children.clone();
            // clears siblings and reinserts own id
            parent.children.clear();
            parent.add_child(child_id);

            orphans = Some(siblings);
        }

    };

    if let Some(children) = orphans {
        for child in children {
            self.add_with_dependancy(child, child_id);
        }
    };
}
