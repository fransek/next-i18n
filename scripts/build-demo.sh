rollup -c && \
pnpm pack --pack-destination demo/temp && \
cd demo && \
pnpm add ./temp/*.tgz && \
rm -rf temp