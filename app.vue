<script setup>
import mapBoxPolyline from "@mapbox/polyline";

const mapElement = ref(null);

onMounted(() => {
  if (window.google && window.google.maps) {
    initMap();
  }
});

async function initMap() {
  const polylineGroupList = [];
  const map = new google.maps.Map(mapElement.value, {
    center: { lat: 35.6895, lng: 139.6917 }, // 東京
    zoom: 13,
  });

  const response = await $fetch("/api/route-optimization");
  // [0]成功レスポンス [1], [2]は詳細不明。
  const data = response[0];

  data.routes.forEach((route) => {
    const polylineList = [];
    route.transitions.forEach((transition) => {
      if (!transition.routePolyline.points) {
        return;
      }
      const decodedPolyline = mapBoxPolyline.decode(
        transition.routePolyline.points
      );

      const polylineData = decodedPolyline.map(([lat, lng]) => ({
        lat,
        lng,
      }));

      // polylineList に追加
      polylineList.push(polylineData);
    });
    polylineGroupList.push(polylineList);
  });

  // 車両ごとのデータに分かれていると思われるため本当はよくないが、サンプルのため一次元配列として扱う
  polylineGroupList.flat().forEach((polylineData) => {
    const polyline = new google.maps.Polyline({
      path: polylineData,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
    polyline.setMap(map);
  });

  // 初期描画位置を変更
  const bounds = new google.maps.LatLngBounds();
  polylineGroupList.flat().forEach((polylineData) => {
    polylineData.forEach((coord) => {
      bounds.extend(coord);
    });
    map.fitBounds(bounds);
  });
}
</script>

<template>
  <div ref="mapElement" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}
</style>
