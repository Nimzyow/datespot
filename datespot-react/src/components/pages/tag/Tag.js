import React, { useEffect } from "react";
import TagItem from "../../tag/TagItem";

import { connect } from "react-redux";

import { getTags } from "../../../actions/tagActions";

const Tag = ({ getTags, tag: { tags } }) => {
  useEffect(() => {
    getTags();
  }, []);

  return tags.map((tag) => <TagItem key={tag.id} tag={tag.tag} />);
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps, { getTags })(Tag);
