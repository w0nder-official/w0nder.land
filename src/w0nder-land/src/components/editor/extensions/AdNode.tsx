import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type { NodeViewProps } from './types';
import { NODE_TYPES } from './types';
import { AdSense } from '@/components/common/AdSense';
import { AD_SLOTS, AdFormat, AdSlotType } from '@/constants/ads';

type AdNodeAttrs = {
  adSlot: AdSlotType;
  adFormat?: AdFormat;
};

export const AdNode = Node.create({
  name: NODE_TYPES.AD_NODE,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      adSlot: {
        default: AdSlotType.IN_ARTICLE,
        parseHTML: element => element.getAttribute('data-ad-slot'),
        renderHTML: attributes => {
          if (!attributes.adSlot) {
            return {};
          }
          return {
            'data-ad-slot': attributes.adSlot,
          };
        },
      },
      adFormat: {
        default: AdFormat.IN_ARTICLE,
        parseHTML: element => element.getAttribute('data-ad-format'),
        renderHTML: attributes => {
          if (!attributes.adFormat) {
            return {};
          }
          return {
            'data-ad-format': attributes.adFormat,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="ad"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'ad' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomAdView);
  },
});

export const CustomAdView = (props: NodeViewProps) => {
  const { node } = props;
  const attrs = node.attrs as AdNodeAttrs;

  return (
    <NodeViewWrapper>
      <div className="my-8">
        <AdSense
          adSlot={AD_SLOTS[attrs.adSlot || AdSlotType.IN_ARTICLE]}
          adFormat={attrs.adFormat || AdFormat.IN_ARTICLE}
          fullWidthResponsive
          enableLazyLoad
          className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>
    </NodeViewWrapper>
  );
};
