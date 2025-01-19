rollup -c && \
pnpm pack --pack-destination sandbox/temp && \
cd sandbox && \
pnpm remove @fransek/next-i18n && \
pnpm add ./temp/*.tgz && \
rm -rf temp